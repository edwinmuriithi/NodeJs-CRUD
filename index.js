const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "606969",
    datasbase: "Employeedb"
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection successful');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express server is running at port no : 3000'));

app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employeedb.employee', (err, rows, fields) => {
        if (!err)
            console.log(rows);
        else
            console.log(err);
    });
});