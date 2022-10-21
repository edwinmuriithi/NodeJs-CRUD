const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "606969",
    datasbase: "Employeedb",
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection successful');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000, () => console.log('Express server is running at port no : 3000'));

//Get all Employees
app.get('/employees', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employeedb.employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Get an Employee usng id
app.get('/employees/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Employeedb.employee WHERE EmpID =?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    });
});

//Delete an employee using id
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employeedb.employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted Successfully');
        else
            console.log(err);
    });
});

//Insert an employee 
app.post('/employees', (req, res) => {
    let data = { Name: req.body.Name, EmpCode: req.body.EmpCode, Salary: req.body.Salary };
    let sqlQuery = "INSERT INTO Employeedb.employee SET ?";
    mysqlConnection.query(sqlQuery, data, (err, results) => {
        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});

//Update an employee 
app.put('/employees/:id', (req, res) => {
    let sqlQuery = "UPDATE Employeedb.employee SET Name='" + req.body.Name + "',EmpCode='" + req.body.EmpCode + "',Salary='" + req.body.Salary + "'WHERE EmpID=" + req.params.id;
    mysqlConnection.query(sqlQuery, (err, results) => {

        if (!err)
            res.send(results);
        else
            console.log(err);
    });
});