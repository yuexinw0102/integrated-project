const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { query } = require("express-validator");
// const pager = require('../utils/pager_helper.js');


const app = express();

// 跨域处理
const cors = require('cors');
app.use(cors());

app.use(logger('dev'));

// 处理post请求参数中间件
app.use(express.json());  // 处理json格式的请求参数
app.use(express.urlencoded({ extended: true }));  // 使用qs库来处理post参数
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 处理静态资源


// 1. 导入用于生成 JWT 字符串的包
const jwt = require("jsonwebtoken");
// 2. 导入用于将客户端发送过来的 JWT 字符串，解析还原成 JSON 对象的包
const { expressjwt } = require("express-jwt");
// 3. secret 一个密钥字符串
const secretKey = "fresh-produce key";
// 挂载全局，方便其它Router中使用
app.locals.jwt = jwt;
app.locals.expressjwt = expressjwt;
app.locals.secretKey = secretKey;


// token验证中间件，如果请求中没有token信息，不通过。unless：白名单
app.use(expressjwt({
  secret: secretKey,
  algorithms: ['HS256']
  // 白名单
}).unless({
  path: ["/login.do","/user/getAll.do"]
}));


// 自定义中间，一、打印请求参数；二、处理分页相关的参数
const rules = [
  query("page_num").toInt().optional(),
  query("page_size").toInt().optional()
];
app.use(...rules, function (req, res, next) {
  console.log("当前请求地址", req.url);
  next();
})

// 路由中间件
app.use('/', require('./routes/loginRouter.js'));
app.use('/goodsProduct', require('./routes/goodsProductRouter'));
app.use('/goodsClassify', require('./routes/classifyRouter'));
app.use('/productSlideShow', require('./routes/productSlideShowRouter'));
app.use('/warehouse', require('./routes/warehouseRouter'));
app.use('/warehouseRider', require('./routes/warehouseRiderRouter'));
app.use('/warehouseSortingRouter', require('./routes/warehouseSortingRouter'));
app.use('/warehouseCommunityRouter', require('./routes/warehouseCommunityRouter'));
app.use('/orderRouter', require('./routes/orderRouter'));
app.use('/user', require('./routes/userRouter.js'));



// 统一错误处理
app.use((req, res) => {
  console.log("统一错误处理");
  res.json({
    code: 500,
    err: res.locals.err
  })
})

app.listen(3000);
module.exports = app;
