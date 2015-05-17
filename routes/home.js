var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/webchat';

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.email) {
		MongoClient.connect(url,function (err,db){
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
			}else{
				var collection = db.collection('users');
			    collection.find({email: req.session.email}).toArray(function (err, result) {
					if (err) {
						console.log(err);
					} else if (result.length) {
						res.render('home', { 
							title: 'Webchat: Home',
							name:result[0].name,
							status:result[0].status,
							mail:result[0].email
						});
					} else {
						res.redirect('/login');
					}
					db.close();
			    });
			};
		});
	}else{
		res.redirect('/login');
	};
});

module.exports = router;