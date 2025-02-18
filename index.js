const express = require('express');
import { sign, verify } from 'jsonwebtoken';
const app = express();
const port = process.env.PORT || 3000;
const env = require('dotenv').config();
const authRoutes = require('./routes/authRoutes.js');
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = express.Router();
const courseRoutes = express.Router();


app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});




app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});