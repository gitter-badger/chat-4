var express = require('express');
var router = express.Router();
var validator = require('validator');
var user = require("./mode/users.js");

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/webchat';

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Webchat: Login' });
});

router.post('/user', function(req, res, next) {
	user.findmail(req.body.email,function(result){
		res.send(result);
	});
	
});



module.exports = router;
