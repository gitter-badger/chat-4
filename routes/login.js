var express = require('express');
var router = express.Router();
var validator = require('validator');
var m_user = require('./mode/users.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Webchat: Login' });
});

router.post('/user', function(req, res, next) {
	result = m_user.findmail(req.body.email);
	res.send(result);
	// if (result) {
	// 	if (req.body.pass == result[0].password) {
	// 		req.session.email = result[0].email;
	// 		res.redirect('/home');
	// 	}else{
	// 		res.redirect('/login');
	// 	};
	// };
});


module.exports = router;
