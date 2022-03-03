const express = require('express');
const path = require('path');
const body = require('body-parser');
//const app = express();
const mysql = require('mysql');

var fs = require('fs');
var http = require('http');
var https = require('https');
//var privateKey  = fs.readFileSync(path.resolve('server/key.pem', 'utf8'));
var privateKey  = fs.readFileSync(__dirname+'/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const app = express();

app.use(body());
app.use(express.static(path.resolve(__dirname, '..', 'build')));


var httpsServer = https.createServer(credentials, app);

//app.use(body());
//app.use(express.static(path.resolve(__dirname, '..', 'build')));

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'phat',
    password: 'phat1234',
    database: 'puriphat_final'
});
// show data
app.get('/data', function(req,res){
    console.log("Hello in /data ");
    let sql = 'SELECT u.id, u.firstname, u.lastname, u.addby, p.name_th, u.regis_time FROM users u, province p WHERE u.province_ID=p.province_ID ORDER BY u.id;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

// show data province
app.get('/dataprovince', function(req,res){
    console.log("Hello in /dataprovince ");
    let sql = 'SELECT * FROM province ORDER BY CONVERT (name_th USING tis620);';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

// show data by province
app.get('/dataup', function(req, res) {
    var sql = 'SELECT * FROM users u, province p WHERE p.name_th ='+localStorage.getItem('province');
    db.query(sql,function (error, results) {
        if(error) throw error;
        console.log(req.body.province);
    });
});

//delete
app.put('/delete', function(req, res) {
    var sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql,[req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//edit
app.put('/data', function(req, res) {
    var sql = 'UPDATE users SET firstname= ? , lastname = ? WHERE id = ?';
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
        lastname:req.body.lastname,
        addby:req.body.addby,
        province_ID:req.body.province
    };
    let sql = 'INSERT INTO users SET ?';
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
