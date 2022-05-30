const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const PORT = 5000;

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'crud_contact'
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/get', (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result)
    })
})

app.post('/api/post', (req, res) => {
    const {name, email, contact} = req.body;
    const sqlInsert = 'INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)';
    db.query(sqlInsert, [name, email, contact], (err, result)=> {
        if(err) {
            console.log(err)
        }
    })
})

app.delete('/api/remove/:id', (req, res) => {
    const {id} = req.params;
    const sqlRemove = 'DELETE FROM contact_db WHERE id = ?';
    db.query(sqlRemove, id, (err, result)=> {
        if(err) {
            console.log(err)
        }
    })
})

app.get('/api/get/:id', (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

app.put('/api/update/:id', (req, res) => {
    const {id} = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if(error){
            console.log(error)
        }
        res.send(result)
    })
})

app.get('/', (req, res) => {
    console.log('home page');
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
})