import express from 'express'
const app = express();
import cors from 'cors';

app.set('port', process.env.PORT || 3000) 



// use json for API routes
app.use(express.json());


app.get('/', (req, res, next) => {
    res.send('<h1>Hello world<h1>');
})

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})