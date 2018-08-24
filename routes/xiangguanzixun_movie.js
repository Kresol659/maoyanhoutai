var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
var multiparty = require('multiparty');
var util = require("util");
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//展示所有信息
router.post('/related', function (req, res) {
 
  http.post('127.0.0.1:3333/movie_related/find',req.body).then(function (data) {
    res.send(data);
  })
});
//搜索
router.post('/title', function (req, res) {
  console.log(req.body)
  http.post('127.0.0.1:3333/movie_related/find', req.body).then(function (data) {
    res.send(data);
  })
});
//上传的图片
router.post('/related_img', function (req, res) {
  var form = new multiparty.Form({ uploadDir: './public/movie_img/' });  //文件路径可以修改，如果修改记得和下面的路径保持一致
 form.parse(req, function (err, fields, files) {
var filesTmp = JSON.stringify(files, null, 2);
if (err) {
      console.log('parse error: ' + err);
    } else {
      console.log('parse files: ' + filesTmp);
      var files = files.inputFile;
    }
   let newPath = [];
    for (let item of files) {
      newPath.push(item.path.replace(/public/, ''));
    }
    res.send(JSON.stringify(newPath));    //发送消息回去
  });
})
//上传增加所有
router.post('/add_r', function (req, res) {
  http.post('127.0.0.1:3333/movie_related/add', req.body).then(function (data) {
    res.send(data);
  })
});

//删除数据
router.get('/remove_r', function (req, res) {
  http.get('127.0.0.1:3333/movie_related/del', req.query).then(function (data) {
    res.send(data);
  })
});
//修改
router.get('/alter_r', function (req, res) {
  http.get('127.0.0.1:3333/movie_related/update', req.query).then(function (data) {
    res.send(data);
  })
});
module.exports = router;
