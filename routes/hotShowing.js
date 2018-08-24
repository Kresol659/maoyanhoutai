var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
var multiparty = require('multiparty');
var util = require("util");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//----------------------------展示全部信息-----------------------------//
router.post('/show', function (req, res, next) {
  // console.log(req.body);
  http.post('127.0.0.1:3333/hotShowing/find', req.body).then(function (data) {
    res.send(data)
  })
});


//------------------------------增加----------------------------//

router.post('/add', function (req, res) {
  http.post('127.0.0.1:3333/movieManage/find', {}).then(function (mov_data) {
  })
})

// -----------------确认添加--------------------//

router.post('/hotShowing_add', function (req, res, next) {
  http.post('127.0.0.1:3333/hotShowing/add', req.body).then(function (data) {
    res.send(data)
  })
});


//-----------------------------删除------------------------//

router.post('/show_remove', function (req, res, next) {
  http.post('127.0.0.1:3333/hotShowing/del', req.body).then(function (data) {
    res.send(data)
  })
});

//-----------------------------删除------------------------//

router.post('/removeRepeat', function (req, res, next) {
  console.log(req.body)
  http.post('127.0.0.1:3333/movieManage/update', req.body).then(function (data) {
    res.send(data)
  })
});


router.post('/show_add', function (req, res, next) {
  http.post('127.0.0.1:3333/movieManage/find', req.body).then(function (data) {
    res.send(data)
  })
});


router.post('/addshow', function (req, res, next) {
  http.post('127.0.0.1:3333/hotShowing/add', req.body).then(function (data) {
    res.send(data)
  })
});


module.exports = router;