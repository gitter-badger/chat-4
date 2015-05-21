var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send("");
});

router.get('/test', function(req, res, next) {
	req.session.nome = "Usuario";
	res.render('test');

});

module.exports = router;
