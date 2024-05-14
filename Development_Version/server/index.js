// 1. 引入
const express = require("express"); //express框架
const bodyParser = require("body-parser"); //获取POST请求体
const cors = require("cors"); //允许跨域

//2. 创建应用对象
const app = express();
app.use(bodyParser.urlencoded({extended: true})); //解析POST请求体
app.use(cors()); // 使用中间件来允许跨域  -->  Access-Control-Allow-Origin:*

// 3. 创建路由规则
app.get("/server", (request, response) => {
  // 接收参数
  const queryParams = request.query;
  const queryParamsJSON = {};
  for (const param in queryParams) {
    queryParamsJSON[param] = queryParams[param];
  }
  // 封装
  const obj = {title: "您传入的参数是：", data: queryParamsJSON};
  // 响应
  response.send(obj);
});

app.post("/server", (request, response) => {
  // 接收参数
  const keys = Object.keys(request.body);
  const ParamsJSON = {};
  keys.forEach((key) => {
    ParamsJSON[key] = request.body[key];
  });
  // 封装
  const obj = {title: "您传入的参数是：", data: ParamsJSON};
  // 响应
  response.send(obj);
});

app.all("/json-server", (request, response) => {
  // 封装
  const obj = {
    title: "用户信息：",
    data: {
      name: "niki",
      age: "22",
    },
  };
  // 响应
  response.send(obj);
});

//针对 IE 缓存
app.get("/ie", (request, response) => {
  // 响应
  response.send("HELLO IE5");
});

//针对 请求超时：作延时响应
app.get("/delay", (request, response) => {
  setTimeout(() => {
    //设置响应体
    response.send("Delay......");
  }, 3000);
});

//针对 jQuery 服务
app.all("/jquery-server", (request, response) => {
  // 接收参数
  const queryParams = request.query;
  const queryParamsJSON = {};
  for (const param in queryParams) {
    queryParamsJSON[param] = queryParams[param];
  }
  // 封装
  const obj = {title: "您传入的参数是：", data: queryParamsJSON, msg: "Hello Jquery-Server"};
  // 响应
  response.send(obj);
});

//针对 axios 服务
app.all("/axios-server", (request, response) => {
  // 接收参数
  const queryParams = request.query;
  const queryParamsJSON = {};
  for (const param in queryParams) {
    queryParamsJSON[param] = queryParams[param];
  }
  // 封装
  const obj = {title: "您传入的参数是：", data: queryParamsJSON, msg: "Hello Axios-Server"};
  // 响应
  response.send(obj);
});

//针对 fetch 服务
app.all("/fetch-server", (request, response) => {
  // 接收参数
  const queryParams = request.query;
  const queryParamsJSON = {};
  for (const param in queryParams) {
    queryParamsJSON[param] = queryParams[param];
  }
  // 封装
  const obj = {title: "您传入的参数是：", data: queryParamsJSON, msg: "Hello Fetch-AJAX"};
  // 响应
  response.send(obj);
});

// 原生JSONP
app.all("/JSONP", (request, response) => {
  // 获取回调函数名称
  const callback = request.query.callback;
  // 要返回的数据
  const responseData = {msg: "Hello JSONP"};
  // 将数据包装在回调函数中
  const responseString = `${callback}(${JSON.stringify(responseData)})`;
  // 发送响应
  response.send(responseString);
});

// JQuery的JSONP
app.all("/JSONP_JQuery", (request, response) => {
  // 获取回调函数名称
  const callback = request.query.callback;
  // 要返回的数据
  const responseData = {msg: "Hello JSONP_JQUERY"};
  // 将数据包装在回调函数中
  const responseString = `${callback}(${JSON.stringify(responseData)})`;
  // 发送响应
  response.send(responseString);
});

// 启动服务
app.listen(8000, () => {
  console.log("服务已经启动， 8000端口监听中....");
});
