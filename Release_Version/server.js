// 1. 引入
const express = require("express"); //express框架
const bodyParser = require("body-parser"); //获取POST请求体
const cors = require("cors"); //允许跨域
const path = require("path"); // 处理文件路径

// 2. 创建应用对象
const app = express();
app.use(bodyParser.urlencoded({extended: true})); //解析POST请求体
app.use(cors()); // 使用中间件来允许跨域  -->  Access-Control-Allow-Origin:*
const distDir = path.join(__dirname, "dist");
app.use(express.static(distDir)); // 设置静态文件

// 3. 路由
app.get("/server", (request, response) => {
  const queryParams = request.query;
  const queryParamsJSON = {};
  for (const param in queryParams) {
    queryParamsJSON[param] = queryParams[param];
  }
  const obj = {title: "您传入的参数是：", data: queryParamsJSON};
  response.send(obj);
});

app.post("/server", (request, response) => {
  const keys = Object.keys(request.body);
  const ParamsJSON = {};
  keys.forEach((key) => {
    ParamsJSON[key] = request.body[key];
  });
  const obj = {title: "您传入的参数是：", data: ParamsJSON};
  response.send(obj);
});

app.all("/json-server", (request, response) => {
  const obj = {
    title: "用户信息：",
    data: {
      name: "niki",
      age: "22",
    },
  };
  response.send(obj);
});

app.get("/ie", (request, response) => {
  response.send("HELLO IE5");
});

app.get("/delay", (request, response) => {
  setTimeout(() => {
    response.send("Delay......");
  }, 3000);
});

app.all("/jquery-server", (request, response) => {
  const queryParams = request.query;
  const queryParamsJSON = {};
  for (const param in queryParams) {
    queryParamsJSON[param] = queryParams[param];
  }
  const obj = {title: "您传入的参数是：", data: queryParamsJSON, msg: "Hello Jquery-Server"};
  response.send(obj);
});

app.all("/axios-server", (request, response) => {
  const queryParams = request.query;
  const queryParamsJSON = {};
  for (const param in queryParams) {
    queryParamsJSON[param] = queryParams[param];
  }
  const obj = {title: "您传入的参数是：", data: queryParamsJSON, msg: "Hello Axios-Server"};
  response.send(obj);
});

app.all("/fetch-server", (request, response) => {
  const queryParams = request.query;
  const queryParamsJSON = {};
  for (const param in queryParams) {
    queryParamsJSON[param] = queryParams[param];
  }
  const obj = {title: "您传入的参数是：", data: queryParamsJSON, msg: "Hello Fetch-AJAX"};
  response.send(obj);
});

app.all("/JSONP", (request, response) => {
  const callback = request.query.callback;
  const responseData = {msg: "Hello JSONP"};
  const responseString = `${callback}(${JSON.stringify(responseData)})`;
  response.send(responseString);
});

app.all("/JSONP_JQuery", (request, response) => {
  const callback = request.query.callback;
  const responseData = {msg: "Hello JSONP_JQUERY"};
  const responseString = `${callback}(${JSON.stringify(responseData)})`;
  response.send(responseString);
});

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const iface in interfaces) {
    for (const alias of interfaces[iface]) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "127.0.0.1";
}
app.get("/local-ip", (req, res) => {
  const localIp = getLocalIpAddress();
  res.json({ip: localIp});
});

// 4.应用
app.get("/", (request, response) => {
  response.sendFile(path.join(distDir, "index.html"));
});

// 5.启动服务
app.listen(8000, () => {
  console.log("服务已经启动， 8000端口监听中....");
});
