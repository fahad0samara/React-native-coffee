import express, {Request, Response} from 'express';
import multer from 'multer';
import path from 'path';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

// Define a custom type for SQLite error
type SQLiteError = Error & {errno?: number};

const router = express.Router();
const db = new sqlite3.Database('coffee.db');
const cloudinary = require('cloudinary').v2;

// Define the storage for image uploads using Multer
cloudinary.config({
  cloud_name: 'dh5w04awz',
  api_key: '154856233692976',
  api_secret: 'sD9lI3ztLqo62It9mEias2Cqock', // Replace with your Cloudinary API secret
});

const storage = multer.memoryStorage(); // Use memory storage for multer

const upload = multer({storage});

// Create a users table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      email TEXT UNIQUE,
      password TEXT,
      profile_image TEXT
    )
  `);
});

// Registration endpoint
router.post('/register', upload.single('profile_image'), async (req, res) => {
  const {username, email, password} = req.body;
  const profileImageBuffer = req.file ? req.file.buffer : null;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  let imageUri = null;

  // Check if the user uploaded an image
  if (profileImageBuffer) {
    const uploadOptions = {
      folder: 'coffee-user', // Specify the folder in Cloudinary
      public_id: `coffee-${Date.now()}`, // Specify the public ID for the image
      overwrite: true, // Overwrite existing image if necessary
    };

    // Upload the profile image to Cloudinary
    try {
      const result = await cloudinary.uploader.upload_stream(
        uploadOptions,
        (error: SQLiteError | null, result: any) => {
          if (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return res.status(500).json({error: 'Internal server error'});
          }

          imageUri = result.secure_url;

          // Insert the user into the database with the uploaded image
          insertUser(username, email, hashedPassword, imageUri, res);
        },
      );

      result.end(profileImageBuffer);
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return res.status(500).json({error: 'Internal server error'});
    }
  } else {
    // Insert the user into the database without a profile image (use a default image URL)
    const defaultImageUrl =
      'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='; // Replace with your default image URL
    insertUser(username, email, hashedPassword, defaultImageUrl, res);
  }
});

// Function to insert a user into the database
function insertUser(
  username: string,
  email: string,
  hashedPassword: string,
  imageUri: string | null,
  res: Response,
) {
  db.run(
    'INSERT INTO users (username, email, password, profile_image) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, imageUri],
    (err: SQLiteError | null) => {
      if (err) {
        if (err.errno === sqlite3.CONSTRAINT) {
          return res.status(400).json({error: 'Email address already exists'});
        }
        console.error('Database error:', err);
        return res.status(500).json({error: 'Internal server error'});
      }

      return res.status(201).json({message: 'User registered successfully'});
    },
  );
}

export default router;
