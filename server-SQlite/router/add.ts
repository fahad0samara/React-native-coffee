import express from 'express'
const router = express.Router();


const db = new sqlite3.Database('coffee.db');

// Define the storage for image uploads using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({storage});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS coffeeData (
      id TEXT PRIMARY KEY,
      categoryId TEXT,
      name TEXT,
      description TEXT,
      imageUri TEXT,
      price TEXT,
      ingredients TEXT,
      servingSize TEXT,
      caffeineContent TEXT,
      origin TEXT,
      roastLevel TEXT
    )
  `);
});

router.post('/add-coffee', upload.single('image'), (req, res) => {
  const coffeeItem = req.body;
  const imageUri = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO coffeeData
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    coffeeItem.id,
    coffeeItem.categoryId,
    coffeeItem.name,
    coffeeItem.description,
    imageUri,
    coffeeItem.price,
    coffeeItem.ingredients,
    coffeeItem.servingSize,
    coffeeItem.caffeineContent,
    coffeeItem.origin,
    coffeeItem.roastLevel,
  ];

  db.run(sql, values, error => {
    if (error) {
      console.error('Error adding coffee item:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.status(200).json({message: 'Coffee item added successfully'});
    }
  });
});

router.get('/coffee-items', (req, res) => {
  const sql = 'SELECT * FROM coffeeData';

  db.all(sql, [], (error, rows) => {
    if (error) {
      console.error('Error fetching coffee items:', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.status(200).json(rows);
    }
  });
});


export default router;