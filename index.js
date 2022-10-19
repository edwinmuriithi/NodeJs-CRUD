const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '606969',
    datasbase: 'Employeedb'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection successful');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});