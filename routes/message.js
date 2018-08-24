
var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');//后台
var multiparty = require('multiparty');//上传图片或文件
var util = require("util");//上传图片或文件

/* GET users listing. */

//资讯板块初始化
router.post('/getTableData', function(req, res) {
  
    http.post('127.0.0.1:3333/message/find',req.body).then(function(data){

      res.send(data);
  })
  });
//资讯-增加
// router.get('/addData', function(req, res) {
//   http.get('127.0.0.1:3333/message/add',req.query).then(function(data){

//     res.send(data);
// })
// });
//资讯——增加--点击上传
router.post('/addBtn', function(req, res) {
  http.post('127.0.0.1:3333/message/add',{new_picture:req.body['new_picture[]'],new_title:req.body.new_title,new_time:req.body['new_time'],new_criticism:req.body['new_criticism'],new_word:req.body['new_word']}).then(function(data){
    // console.log(req.query);
    res.send(data);
    console.log(req.body)
})
});


  /* 上传图片*/
  router.post('/upFile', function (req, res) {
    //生成multiparty对象，并配置上传目标路径
    console.log(req.body)
    var form = new multiparty.Form({ uploadDir: './public/movie_img/' });  //文件路径可以修改，如果修改记得和下面的路径保持一致
  
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
  
      var filesTmp = JSON.stringify(files, null, 2);
  
      if (err) {
        console.log('parse error: ' + err);
      } else {
        console.log('parse files: ' + filesTmp);
        var files = files.inputFile;
      }
  
      // 发送第一张图片的信息
      // let str = files[0].path;
      // let newPath = str.replace(/public/, '');
  
      // res.send(newPath);    //发送消息回去
  
      //给个循环可以全部发送
      let paths=[];
      for (let obj of files) {
        paths.push(obj.path.replace(/public/, ''));
            //发送消息回去
      }
      // console.log(paths)
      res.send(paths.join(','));
      
    });
  
  });
  

//A删除
router.get('/removeData', function(req, res) {
  http.get('127.0.0.1:3333/message/del',req.query).then(function(data){
    console.log(req.query);
    res.send(data);
})
});
//A修改
router.post('/updataData', function(req, res) {
  http.post('127.0.0.1:3333/message/update',req.body).then(function(data){
    // console.log(1);
    // console.log(data);
    res.send(data);
})
});
//搜索
router.post('/search', function(req, res) {
  http.post('127.0.0.1:3333/message/find',req.body).then(function(data){
    console.log(data);
    res.send(data);
})
});
  module.exports = router

  