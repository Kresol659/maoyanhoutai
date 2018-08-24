var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
var multiparty = require('multiparty');
var util = require("util");
/* GET home page. */
//············显示院线匹配电影···········//
router.post('/suitMovie', function (req, res) {

    http.post('127.0.0.1:3333/theatreMatch/find', req.body).then(function (data) {
        res.send(data);
    })
});
//············显示电影管理电影···········//
router.post('/showMovie', function (req, res) {
    req.body.movie_select = 'false';
    http.post('127.0.0.1:3333/movieManage/find', req.body).then(function (data) {
        res.send(data);
    })
});
//············去掉已匹配的电影···········//
router.post('/rmovieRepeat', function (req, res) {
    http.post('127.0.0.1:3333/movieManage/update', req.body).then(function (data) {

        res.send(data);
    })
});
//············重置已匹配的电影···········//
router.post('/resetRepeat', function (req, res) {
    http.post('127.0.0.1:3333/movieManage/update', req.body).then(function (data) {
        res.send(data);
    })
});
//············查询是否重复电影···········//
router.post('/rMovie', function (req, res) {
    http.post('127.0.0.1:3333/theatreMatch/find', req.body).then(function (data) {

        res.send(data);
    })
});
//············添加电影···········//
router.post('/addMovie', function (req, res) {
    req.body.theatreMch_cinema = [];
    http.post('127.0.0.1:3333/theatreMatch/add', req.body).then(function (data) {
        res.send(data);
    })
});
//············过滤影院···········//
router.post('/filterCinema', function (req, res) {
    http.post('127.0.0.1:3333/theatreMatch/find', req.body).then(function (data) {
        res.send(data);
    })
});
//············添加影院···········//
router.post('/addCinema', function (req, res) {

    http.post('127.0.0.1:3333/theatreManage/find', {}).then(function (data) {
        res.send(data);

    })
});
//············添加放映厅···········//
router.post('/addShow', function (req, res) {
    req.body.submitType = 'findJoin';
    req.body.ref = ['screening[]'];
    http.post('127.0.0.1:3333/theatreManage/find', req.body).then(function (data) {
        res.send(data.rows[0]['screening[]']);


    })
});
//············添加时间票价···········//
router.post('/addtime', function (req, res) {
    http.post('127.0.0.1:3333/screening[]/add', req.body).then(function (data) {
        res.send(data);

    })
});
//············找到当前影院的放映厅字段···········//
router.post('/findTime', function (req, res) {
    http.post('127.0.0.1:3333/theatreManage/find', req.body).then(function (data) {
        res.send(data);

    })
});
//············更新放映厅数据···········//
router.post('/updateTime', function (req, res) {
    http.post('127.0.0.1:3333/theatreManage/update', req.body).then(function (data) {
        res.send(data);

    })
});
//············删除电影···········//
router.get('/removeMovie', function (req, res) {

    http.post('127.0.0.1:3333/theatreMatch/del', req.query).then(function (data) {
        res.send(data);

    })
});
//············添加影院名称到匹配表···········//
router.post('/addCinema_inName', function (req, res) {
    http.post('127.0.0.1:3333/theatreMatch/find', req.body).then(function (data) {
        res.send(data);

    })
});
//············添加影院字段名称到匹配表···········//
router.get('/updateCinema_inName', function (req, res) {

    http.post('127.0.0.1:3333/theatreMatch/update', { _id: req.query._id, theatreMch_cinema: req.query.theatreMch_cinema }).then(function (data) {
        res.send(data);

    })
});
//············添加影院名称到匹配表···········//
router.get('/updateCinema_Name', function (req, res) {
    http.post('127.0.0.1:3333/theatreMatch/update', { _id: req.query._id, theatreMch_cinema: req.query.theatreMch_cinema }).then(function (data) {
        res.send(data);

    })
});
// //············添加放映厅到下拉列表···········//
router.post('/addSelect', function (req, res) {
    http.post('127.0.0.1:3333/screening[]/find', req.body).then(function (data) {
        res.send(data);

    })
});
// //············搜索···········//
router.post('/searchAny', function (req, res) {
    http.post('127.0.0.1:3333/theatreMatch/find', req.body).then(function (data) {
        res.send(data);

    })
});
// ············修改···········//
router.post('/changeShowMovie', function (req, res) {
    http.post('127.0.0.1:3333/theatreMatch/find', req.body).then(function (data) {
        res.send(data);

    })
});
// ············添加修改的影院到修改的下拉列表···········//
router.post('/changeSelectCinema', function (req, res) {
    http.post('127.0.0.1:3333/theatreMatch/find', req.body).then(function (data) {
        res.send(data);

    })
});
// ············添加所有的影院到修改的下拉列表···········//
router.post('/addSelectCinema', function (req, res) {
    http.post('127.0.0.1:3333/theatreManage/find', req.body).then(function (data) {
        res.send(data);
    })
});
// ············修改后的影院加入数据库···········//
router.post('/changeInCinema', function (req, res) {
    http.post('127.0.0.1:3333/theatreMatch/update', { _id: req.body._id, theatreMch_cinema: req.body['theatreMch_cinema[]'] }).then(function (data) {
        res.send(data);
    })
});
// ············选择一个影院，准备修改放映厅···········//
router.post('/ShowNowCinema', function (req, res) {
    http.post('127.0.0.1:3333/theatreMatch/update', { _id: req.body._id, theatreMch_cinema: req.body['theatreMch_cinema[]'] }).then(function (data) {
        res.send(data);
    })
});
// ············选择一个影院，显示当前影院的放映厅···········//
router.post('/selectShow', function (req, res) {
    req.body.submitType = 'findJoin';
    req.body.ref = ['screening[]'];
    http.post('127.0.0.1:3333/theatreManage/find', req.body).then(function (data) {
        res.send(data[0]['screening[]']);

    })
});
// ············修改时添加所有放映厅到下拉列表···········//
router.post('/addChange_show', function (req, res) {
    http.post('127.0.0.1:3333/screening[]/find', req.body).then(function (data) {
        res.send(data);
    })
});
// ············修改放映厅···········//
router.get('/updateShow', function (req, res) {
    http.post('127.0.0.1:3333/screening[]/update', {
        _id: req.query._id,
        screenName: req.query.screenName,
        showTime: req.query.showTime,
        price: req.query.price
    }).then(function (data) {
        res.send(data);
    })
});
// ············找到当前影院···········//
router.post('/findShow', function (req, res) {
    http.post('127.0.0.1:3333/theatreManage/find', req.body).then(function (data) {
        res.send(data);
    })
});
// ············删除放映厅···········//
router.post('/deleteShow', function (req, res) {
    // req.body['screening[]']=req.body['screening[]'].split(',');
    req.body['screening[]'] = [req.body['screening[]']];
    console.log(req.body)
    http.post('127.0.0.1:3333/theatreManage/update', req.body).then(function (data) {
        res.send(data);
    })
});

module.exports = router;
