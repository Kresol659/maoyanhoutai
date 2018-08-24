var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
//登陆
router.post('/login', function (req, res) {
  let param = { name: req.body.name, pwd: req.body.pwd }
  http.get('127.0.0.1:3333/movie/find', param).then(function (data) {
    if (data.length > 0) {
      res.redirect('../module/management/management.html')
    } else {
      res.redirect('/module/login/login.html?error=true')
    }
  });
});
//获取表格信息
router.post('/top', function (req, res, ) {
  http.get('127.0.0.1:3333/user/find', req.body).then(function (data) {
    res.send(data)
  });
});
//增加信息
router.get('/addConfin', function (req, res) {
  http.get('127.0.0.1:3333/user/add', req.query).then(function (data) {
    res.send(data)
  });
});
//修改数据
router.get('/upDataNum', function (req, res) {
  http.get('127.0.0.1:3333/user/find', req.query).then(function (data) {
    res.send(data)
  });
});
router.get('/upDataNew', function (req, res) {
  http.get('127.0.0.1:3333/user/update', req.query).then(function (data) {
    res.send(data)
  });
});
//删除信息
router.post('/deleteDown', function (req, res) {
  console.log('111111111111111'+req.query)
  http.get('127.0.0.1:3333/user/del', req.body).then(function (data) {
    res.send(data)
  });
});
//搜索信息
router.get('/', function (req, res) {
  http.get('127.0.0.1:3333/user/find', req.query).then(function (data) {
    res.send(data)
  });
});



router.post('/getMovies', function (req, res) {
	console.log(req.body)
    http.post('http://127.0.0.1:3333/movieManage/find', req.body).then(function (data) {
	res.send(data)
  })
});
module.exports = router;
