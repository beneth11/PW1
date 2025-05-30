var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Conversor de Arquivos' });
});

router.get('/history/login', function(req, res, next) {
  res.render('auth/login-history', { title: 'Login' });
});

router.get('/profile/login', function(req, res, next) {
  res.render('auth/login-profile', { title: 'Login' });
});

router.get('/svg-to-png', function(req, res, next) {
  res.render('convert/svg-to-png', { title: 'SVG para PNG' });
});

router.get('/pdf-to-png', function(req, res, next) {
  res.render('convert/pdf-to-png', { title: 'PDF para PNG' });
});

module.exports = router;
