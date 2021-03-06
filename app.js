const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'nodemysql'
    
});

//connect
db.connect((err)=>{
  if(err){
      throw err;
  }
  console.log('mysql connected');
});

const app = express();

//create DB
app.get('/createdb', (req, res)=>{
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send('database created');
  });
});

//create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Posts table created...');
    });
});

//insert post 1
app.get('/addpost1', (req, res)=>{
    let post = {title:'post one', body:'this is post no one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post one added');
    });
});

//insert post 2
app.get('/addpost2', (req, res)=>{
    let post = {title:'post two', body:'this is post no two'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post two added');
    });
});

//select posts
app.get('/getposts', (req, res)=>{
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post fetched');
    });
});

//select single posts
app.get('/getpost/:id', (req, res)=>{
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send('post fetched');
    });
});

//update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post updated...');
    });
});

//delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Post deleted...');
    });
});



app.listen('3000', ()=>{
    console.log('server started on port 3000');
});

