var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var url = 'mongodb://localhost:27017/webchat';

var users = function () {};

users.prototype.insert = function(mail, name, pass){
	MongoClient.connect(url,function (err,db){
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		}else{
			var userd = {
				mail:mail,
				name:name,
				pass:pass,
				status:""
			}
			db.collection('users').insert([userd], function (err,result) {
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

users.prototype.findmail = function(mail){
	MongoClient.connect(url,function (err,db){
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		}else{
		    db.collection('users').find({email: mail}).toArray(function (err, result) {
		    	temp = [];
				if (err) {
					console.log(err);
				} else if (result.length) {
					temp = result;
				} else {
					temp = false;
				}
				db.close();
				return temp;
		    });
		};
	});
};

module.exports = new users();