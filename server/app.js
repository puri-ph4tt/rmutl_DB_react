const express = require('express');
const path = require('path');
const body = require('body-parser');
//const app = express();
const mysql = require('mysql');

var fs = require('fs');
var http = require('http');
var https = require('https');
<<<<<<< HEAD
var privateKey  = fs.readFileSync(__dirname + '/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
=======
//var privateKey  = fs.readFileSync(path.resolve('server/key.pem', 'utf8'));
var privateKey  = fs.readFileSync(__dirname+'/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/cert.pem', 'utf8');
>>>>>>> 23d027d8ad944d35a07b0d287fbb2cac3e0c978a
var credentials = {key: privateKey, cert: certificate};
const app = express();

app.use(body());
app.use(express.static(path.resolve(__dirname, '..', 'build')));


var httpsServer = https.createServer(credentials, app);

//app.use(body());
//app.use(express.static(path.resolve(__dirname, '..', 'build')));

const db = mysql.createConnection({
<<<<<<< HEAD
    host: '172.29.64.1',
    port: '3306',
    user: 'phatt',
=======
    host: '172.25.240.1',
    user: 'bonn',
>>>>>>> 23d027d8ad944d35a07b0d287fbb2cac3e0c978a
    password: '1234',
    database: 'database_lab'
});
// show data
app.get('/data', function(req,res){
    console.log("Hello in /data ");
    let sql = 'SELECT * FROM students;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

//delete
app.put('/delete', function(req, res) {
    var sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql,[req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//edit
app.put('/data', function(req, res) {
    var sql = 'UPDATE students SET firstname= ? , lastname = ? WHERE id = ?';
    db.query(sql,[req.body.firstname,req.body.lastname,req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//insert
app.post('/data', function(req, res){
    console.log(req.body);
    let data = {
        id:req.body.idkey,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    };
    let sql = 'INSERT INTO students SET ?';
    db.query(sql, data, (err, result)=>{
        if(err){
            console.log(err);
            console.log("ID is Primarykey!!!!!");
            console.log("Enter the id again..");
        }else{
            console.log(result);
        }
    });
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});




//module.exports = app;
module.exports = httpsServer;
