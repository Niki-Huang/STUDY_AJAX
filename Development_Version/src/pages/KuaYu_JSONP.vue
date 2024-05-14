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
        <button type="button" class="btn btn-info" @click="url = `${__proto__.mobileurl}JSONP`">
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
export default {
  name: "KuaYu_JSONP",
  data() {
    return {
      statusCode: "",
      statusStr: "",
      responseHeader: "",
      responseContent: "",
      buttonActive: false,
      countDown: 3,
      timer: null,
      url: `http://127.0.0.1:8000/JSONP`,
      isSuccess: false,
    };
  },
  computed: {
    inputs() {
      return [
        // {id: "i1", title: "状态码", data: this.statusCode},
        // {id: "i2", title: "状态字符串", data: this.statusStr},
      ];
    },
    textareas() {
      return [
        // {id: "t1", title: "响应头", data: this.responseHeader},
        {id: "t2", title: "响应体", data: this.responseContent},
      ];
    },
    buttonInfo() {
      return this.buttonActive ? `请稍后重试(${this.countDown})` : "发送Get请求";
    },
  },
  methods: {
    // 服务器响应后的回调函数
    handleJsonpResponse(data) {
      this.responseContent = data.msg;
      //显示
      this.isSuccess = true;
      // 进度条
      this.$Progress.finish();
      // 弹窗
      this.$toast.success("Successfully received reply!", "OK", {
        position: "bottomRight",
        timeout: 3000,
      });
    },
    send() {
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
      this.$Progress.start();
      // 定义回调函数并绑定到 window 对象
      window["handle"] = (data) => {
        this.handleJsonpResponse(data);
      };
      // 动态创建 <script> 标签
      const script = document.createElement("script");
      // 设置 script 标签的 src 属性
      script.src = `${this.url}?callback=handle`;
      // 将script插入到文档中，也顺便进行了触发
      document.body.appendChild(script);
      // 错误处理
      script.onerror = () => {
        this.$Progress.fail();
        this.$toast.error("Sending request failed", "Fail", {
          position: "bottomRight",
          timeout: 3000,
        });
      };
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
