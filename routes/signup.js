var express = require('express');
var router = express.Router();
var validator = require('validator');

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/webchat';

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('signup', { title: 'Webchat: Signup' });
});

router.post('/', function(req, res, next) {
	err = "";
	if (validator.isEmail(req.body.email) == false) {
		err = err + "\nMail không đúng";
	};
	if (validator.isLength(req.body.pass,5) == false) {
		err = err + "\nPassword phải lớn hơn 5";
	};
	if (req.body.pass != req.body.rpass) {
		err = err + "\nRe-password không đúng";
	};
	if (validator.isLength(req.body.name,5) == false) {
		err = err + "\nName phải lớn hơn 5";
	};
	if (err != "") {
		res.send(err);
	}else{
		MongoClient.connect(url,function (err,db){
			if (err) {
				console.log('Unable to connect to the mongoDB server. Error:', err);
			}else{
				var collection = db.collection('users');
				var userd = {
					email:req.body.email,
					password:req.body.pass,
					name:req.body.name
				}
				collection.insert([userd], function (err,result) {
					if (err) {
						console.log(err);
					} else {
						console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result)
					};
					db.close();
				});
			};
		});
	};
	res.send("Đăng kí thành công");
});

module.exports = router;