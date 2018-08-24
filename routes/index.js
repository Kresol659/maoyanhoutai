var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
var session = require('express-session');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//登录
router.post('/login', function (req, res, next) {
  http.post('127.0.0.1:3333/admin/find', req.body).then(function (data) {
    console.log(data)
    if (data.length == 1) {
      req.session.uname = req.body.uname;
      res.redirect('/index.html');
    }
    else
      res.redirect('/login.html?error=false');
  })
});
//登录状态
router.post('/checkadm', function (req, res, next) {
    res.send(req.session.uname);
});

router.post('/getMovies', function (req, res, next) {
    http.post('http://192.168.43.138:3333/movieManage/find', req.body).then(function (data) {
		res.send(data)
	})
});





module.exports = router;
