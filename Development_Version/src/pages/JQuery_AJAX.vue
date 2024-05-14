<template>
  <div>
    <!-- 发送请求 -->
    <div class="input-group">
      <div class="custom-file">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">URL</span>
        </div>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          v-model="url"
        />
      </div>
      <div class="input-group-append">
        <button
          type="button"
          class="btn btn-info"
          @click="url = `${__proto__.mobileurl}jquery-server?name=niki&age=22`"
        >
          切换URL
        </button>
        <button type="button" class="btn btn-primary" @click="send" :disabled="buttonActive">
          {{ buttonInfo }}
        </button>
      </div>
    </div>
    <hr />
    <!-- 显示结果 -->
    <div v-show="isSuccess">
      <div class="input-group mb-3 result" v-for="inp in inputs" :key="inp.id">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">{{ inp.title }}</span>
        </div>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          :value="inp.data"
        />
      </div>
      <div class="input-group result" v-for="tex in textareas" :key="tex.id">
        <div class="input-group-prepend">
          <span class="input-group-text">{{ tex.title }}</span>
        </div>
        <textarea class="form-control" aria-label="With textarea" :value="tex.data"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "JQuery_AJAX",
  data() {
    return {
      statusCode: "",
      statusStr: "",
      responseHeader: "",
      responseContent: "",
      buttonActive: false,
      countDown: 3,
      timer: null,
      url: "http://127.0.0.1:8000/jquery-server?name=niki&age=22",
      isSuccess: false,
    };
  },
  computed: {
    inputs() {
      return [
        {id: "i1", title: "状态码", data: this.statusCode},
        {id: "i2", title: "状态字符串", data: this.statusStr},
      ];
    },
    textareas() {
      return [
        {id: "t1", title: "响应头", data: this.responseHeader},
        {id: "t2", title: "响应体", data: this.responseContent},
      ];
    },
    buttonInfo() {
      return this.buttonActive ? `请稍后重试(${this.countDown})` : "发送Get请求";
    },
  },
  methods: {
    send() {
      // 限制频繁请求
      this.buttonActive = true;
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else {
          this.buttonActive = false;
          this.countDown = 3;
          clearInterval(this.timer);
        }
      }, 1000);
      //发送请求
      this.$Progress.start();
      $.ajax({
        url: this.url, //url
        data: {gender: "male", school: "MIT"}, //参数
        type: "GET", //请求类型
        dataType: "json", //响应体结果设置
        headers: {msg1: "Hello", msg2: "World"}, //自定义头信息
        timeout: 2000, //超时时间
        //成功的回调 textStatus即是success
        success: (data, textStatus, JQXHR) => {
          this.statusCode = JQXHR.status;
          this.statusStr = JQXHR.statusText;
          this.responseHeader = JQXHR.getAllResponseHeaders();
          this.responseContent = data.msg + "\n" + data.title + JSON.stringify(data.data);
          this.isSuccess = true; //显示结果
          console.log(data);
          // 进度条
          this.$Progress.finish();
          // 弹窗
          this.$toast.success("Successfully received reply!", "OK", {
            position: "bottomRight",
            timeout: 3000,
          });
        },
        //失败的回调
        error: () => {
          this.$Progress.fail();
          this.$toast.error("Sending request failed", "Fail", {
            position: "bottomRight",
            timeout: 3000,
          });
        },
      });
    },
  },
};
</script>

<style scoped>
.result {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
