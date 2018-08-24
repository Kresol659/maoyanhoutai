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
router.post('/movie', function (req, res, next) {
  http.post('127.0.0.1:3333/movieManage/find', req.body).then(function (data) {
    res.send(data);
  })
});
//上传电影的图片
router.post('/add_save', function (req, res) {
  //生成multiparty对象，并配置上传目标路径
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
    //发送第一张图片的信息
    // let str = files[0].path;
    let newPath = [];
    for (let item of files) {
      newPath.push(item.path.replace(/public/, ''));
    }
    res.send(newPath.join(','));    //发送消息回去
  });
})
//上传增加所有输入
router.post('/add', function (req, res) {
    http.post('127.0.0.1:3333/movieManage/add', { 
    movie_name:req.body.movie_name,
    movie_ename:req.body.movie_ename,
    movie_type:req.body.movie_type,
    movie_imgAll:req.body['movie_imgAll[]'],
    movie_director:req.body.movie_director,
    movie_director_img:req.body['movie_director_img[]'],
    movie_actor:req.body.movie_actor,
    movie_actor_img:req.body['movie_actor_img[]'],
    movie_want:req.body.movie_want,
    movie_area:req.body.movie_area,
    movie_year: req.body.movie_year,
    movie_time:req.body.movie_time,
    movie_show:req.body.movie_show,
    movie_brief:req.body.movie_brief,
    movie_major:req.body.movie_major,
    movie_user:req.body.movie_user,
    movie_userComment:req.body.movie_userComment,
    movie_box_office:req.body.movie_box_office,
    movie_img:req.body['movie_img[]'],
    movie_isfalse:req.body.movie_isfalse,
    movie_select:req.body.movie_select
}).then(function (data) {
    res.send(data);
  })
});
//删除数据
router.get('/remove', function (req, res) {
  http.get('127.0.0.1:3333/movieManage/del', req.query).then(function (data) {
    res.send(data);
  })
});
//修改
router.post('/alter', function (req, res) {
  http.post('127.0.0.1:3333/movieManage/update', req.body).then(function (data) {
    res.send(data);
  })
});
router.post('/alter_save', function (req, res) {
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
    res.send(newPath);    //发送消息回去
  });
})
//搜索
router.get('/name', function (req, res) {
  http.get('127.0.0.1:3333/movieManage/find', req.query).then(function (data) {
    res.send(data);
  })
});
router.post('/add_imgAll', function (req, res) {
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
    res.send(newPath.join(','));   //发送消息回去
  });
})
router.post('/add_director', function (req, res) {
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
    res.send(newPath.join(','));     //发送消息回去
  });
})
router.post('/add_actor', function (req, res) {
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
    res.send(newPath.join(','));    //发送消息回去
  });
})
//资讯展示
router.get('/zixun_zhanshi', function (req, res, next) {
  http.get('127.0.0.1:3333/relatedInformation/find', {}).then(function (data) {
    res.send(data);
  })
});
//增加（修改）到电影里
router.post('/add_zixun', function (req, res, next) {
 http.post('127.0.0.1:3333/movieManage/update', req.body).then(function (data) {
    res.send(data);
  })
});

module.exports = router;
