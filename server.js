'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const config = require('./config');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	db.collection('todos').find().toArray(function(err, results) {
		if (err) {return console.log(err);}
		res.render('index.ejs', {todos: results});
	});
});

app.post('/todos', (req, res) => {
	db.collection('todos').save(req.body, (err, result) => {
		if (err) {return console.log(err);}

		console.log(result);
		console.log('saved to database');
		res.redirect('/');
	});
});

// TODO: default 404 url handler here

var db;
var dburl = config.database.url;

MongoClient.connect(dburl, (err, database) => {
	if (err) {return console.log(err);}
	db = database;

	app.listen(3000, () => {
		console.log('App started on 3000!');
	});
});