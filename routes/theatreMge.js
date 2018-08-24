var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

router.post('/table', function (req, res) {
    http.post('127.0.0.1:3333/theatreManage/find', req.body).then(function (data) {
        res.send(data);
    })
});
// 增加数据
router.post('/add', function (req, res) {
    console.log(req.body);
    http.post('127.0.0.1:3333/theatreManage/add', req.body).then(function (data) {
        res.send(data);
    })
});
// 删除数据
router.get('/remove', function (req, res) {
    console.log(req.query);
    http.post('127.0.0.1:3333/theatreManage/del', req.query).then(function (data) {
        res.send(data);
    })
});
// 查找要修改数据
router.post('/update', function (req, res) {

    http.post('127.0.0.1:3333/theatreManage/find', req.body).then(function (data) {
        res.send(data);
    })
});
// 将数据修改到数据库
router.post('/updateData', function (req, res) {
    console.log(req.body);
    http.post('127.0.0.1:3333/theatreManage/update', req.body).then(function (data) {
        res.send(data);
    })
});

router.post('/seat', function (req, res) {
    console.log(req.body);
    http.post('127.0.0.1:3333/sereening[]/add', req.body).then(function (data) {
        res.send(data);
    })
});

router.post('/search', function (req, res) {
    console.log(req.body);
    http.post('127.0.0.1:3333/theatreManage/find', req.body).then(function (data) {
        console.log(data);
        res.send(data);
    })
});




module.exports = router;