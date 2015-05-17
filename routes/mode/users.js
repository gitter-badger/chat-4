var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/webchat';

var user = function () {};

user.prototype.findmail = function (mail,callbaclk) {
	temp = Array();
	MongoClient.connect(url,function (err,db){
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		}else{
		    db.collection('users').find({email: mail}).toArray(function (err, result) {
				if (err) {
					console.log(err);
				} else if (result.length) {
					temp = result;
				} else {
					temp = false;
				}
				db.close();
				callbaclk(temp);
		    });
		};
	});
};

user.prototype.insert = function (userd) {
	MongoClient.connect(url,function (err,db){
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		}else{
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

user.prototype.update = function (userd) {
	MongoClient.connect(url,function (err,db){
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		}else{
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

module.exports = new user();