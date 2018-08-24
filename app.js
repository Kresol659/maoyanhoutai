var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var theatreMatchRouter = require('./routes/theatreMatch');
var theatreMgerRouter = require('./routes/theatreMge');
var routesMovie = require('./routes/routes_movie');
var routesRelated = require('./routes/xiangguanzixun_movie');
var messageRouter = require('./routes/message');//新增电影资讯二级路由
var comingSoonRouter = require('./routes/comingSoon');
var hotBroadcastRouter = require('./routes/hotBroadcast');
var hotShowingRouter = require('./routes/hotShowing');
var userRouter = require('./routes/user');
var session = require('express-session');
var app = express();
var allowCrossDomain = function (req, res, next) {

	if (req.headers.origin == 'http://127.0.0.1:8081') {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		res.header('Access-Control-Allow-Credentials', 'true');
	}
	next();
};
app.use(allowCrossDomain);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(session({
  secret: '659', //一个String类型的字符串，作为服务器端生成session的签名
  resave: true,   //是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
  cookie: { maxAge: 60 * 30 * 1000 }, //设置maxAge是Nms，即Nms后session和相应的cookie失效过期
  saveUninitialized: true //初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/theatreMatch', theatreMatchRouter);//院线匹配
app.use('/theatreMge', theatreMgerRouter);//院线管理
app.use('/routes_movie', routesMovie);//电影管理
app.use('/routesRelated', routesRelated);//相关资讯
app.use('/message', messageRouter);//资讯管理
app.use('/comingSoon', comingSoonRouter); //即将上映
app.use('/hotBroadcast', hotBroadcastRouter);//热播
app.use('/hotShowing', hotShowingRouter);//热映
app.use('/user', userRouter);//用户
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
