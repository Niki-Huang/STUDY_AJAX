# 1、使用
1、安装包：npm i<br>
2、前端运行：npm run serve<br>
3、服务器运行（服务器代码在/server/index.js）：nodemon server<br>

# 2、笔记
## 1、原生 AJAX

创建 AJAX 对象

```js
const xhr = new XMLHttpRequest();
```

设置请求方法和 URL

```js
xhr.open(请求方法，url，是否异步)
```

设置请求头

```js
xhr.setRequestHeader(标准请求头/自定义请求头，值)
```

设置响应数据类型

```js
xhr.responseType = "json";
```

发送请求

```js
xhr.send();
```

处理服务端返回的结果

```js
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300) {
        ...
    }
  }
};
```

响应数据

> 状态码：xhr.status
> 状态字符串：xhr.statusText
> 响应头：xhr.getAllResponseHeaders()
> 响应体：xhr.response

超时回调

```js
xhr.ontimeout = function () {...}
```

网络异常回调

```js
xhr.onerror = function () {...}
```

解决缓存的方法

> 在路径后加上时间戳

取消请求

```js
xhr.abort();
```

解决重复请求的问题

```js
可以使用防抖节流技术;
```

## 2、JQuery 封装 的 AJAX

```js
$.ajax({
  url: ..., //url
  data: ..., //参数
  type: ..., //请求类型
  dataType: ..., //响应体结果设置
  headers: ..., //自定义头信息
  timeout: ..., //超时时间
  //成功的回调 textStatus即是success
  success: (data, textStatus, JQXHR) => {...},
  //失败的回调
  error: () => {...},
});
```

## 3、Axios 封装的 AJAX

```js
axios({
  url: ...,
  method: ...,
  data: ..., //请求体
  params: , //参数
  headers: , //自定义头信息
})
.then((response) => {...})
.catch((msg) => {...});
```

## 4、fetch

浏览器就认得 fetch，不需要去 npm 啥的，请求体需要使用 async await 进行获取，默认是同步的会获取不到

```js
fetch(this.url, {
  method:...,
  body: ..., //请求体
  headers: ..., //自定义头信息
})
.then(async (response) => {...})
.catch((msg) => {...});
```

## 5、原生 JSONP

```js
// 实例中处理响应的回调函数
handleJsonpResponse(data) {...},
send() {
  // 定义回调函数并绑定到 window 对象上，服务器传来的函数会从window身上找
  window["handle"] = (data) => {...调用组件实例的处理函数handleJsonpResponse...};
  // 动态创建 <script> 标签
  const script = document.createElement("script");
  // 设置 script 标签的 src 属性
  script.src = `${this.url}?callback=handle`;
  // 将script插入到文档中，也顺便进行了触发
  document.body.appendChild(script);
  // 错误处理
  script.onerror = () => {...};
},
```

## 6、jquery 的 JSONP

```js
$.getJSON(`${this.url}?callback=?`, (data) => {...});
```

## 7、其他

服务器要获取请求体的内容

```js
const bodyParser = require("body-parser");//使用中间件
...
使用request.body//可以通过request.body访问请求体的内容
```

允许跨域

```js
const cors = require("cors"); //使用中间件
```

进度条插件

```js
// main.js
import VueProgressBar from "vue-progressbar";
const options = {
  color: "#137dd4",
  // failedColor: '#874b4b',
  thickness: "4px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};
Vue.use(VueProgressBar, options);

//模板
<vue-progress-bar></vue-progress-bar>;

// script
this.$Progress.finish();
this.$Progress.fail();
```

小弹窗

```js
// main.js
import VueIziToast from "vue-izitoast";
import "izitoast/dist/css/iziToast.css";
Vue.use(VueIziToast);

// script
this.$toast.success("Successfully received reply!", "OK", {
  position: "bottomRight",
  timeout: 3000,
});
```
