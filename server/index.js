const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bannerDB'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.get('/banner', (req, res) => {
    db.query('SELECT * FROM banners WHERE id = 1', (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

app.put('/banner', (req, res) => {
    const { description, timer, link, isVisible } = req.body;
    db.query('UPDATE banners SET description = ?, timer = ?, link = ?, isVisible = ? WHERE id = 1',
        [description, timer, link, isVisible], (err) => {
            if (err) throw err;
            res.sendStatus(200);
        });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
