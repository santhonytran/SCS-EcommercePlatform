const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000;
const cors =require('cors');
app.use(cors())
app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
app.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 80')
})
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project"
})

app.use(express.static(path.join(__dirname, 'build')))

app.get('/testEndpoint', (req, res) => {
    //app.render(req, res);
    db.query("SELECT * FROM car", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result);
    })
    //res.send('Hello World');
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
});

app.listen(port, () => {
    console.log(`Test server listening on port ${port}`)
})