var express = require('express');
var router = express.Router();
var m_user = require('./mode/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.session.email) {
		result = m_user.findmail(req.session.email);
		if (result) {
			res.render('home', { 
				title: 'Webchat: Home',
				name:result[0].name,
				status:checkstatus(result[0].status),
				mail:result[0].email
			});
		}else{
			res.redirect('/login');
		};
	}else{
		res.redirect('/login');
	};
});

function checkstatus(status){
	if (status = "undefined") {
		return "";
	}else{
		return status;
	};
}

module.exports = router;