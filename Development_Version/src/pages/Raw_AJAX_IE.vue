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
          @click="url = `${__proto__.mobileurl}ie?t=${Date.now()}`"
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
export default {
  name: "Raw_AJAX_IE",
  data() {
    return {
      statusCode: "",
      statusStr: "",
      responseHeader: "",
      responseContent: "",
      buttonActive: false,
      countDown: 3,
      timer: null,
      url: `http://127.0.0.1:8000/ie?t=${Date.now()}`, //只需要加上时间戳即可
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
      return this.buttonActive ? `请稍后重试(${this.countDown})` : "发送请求";
    },
  },
  methods: {
    send() {
      // 隐藏结果
      this.isSuccess = false;
      // 开启请求进度条
      this.$Progress.start();
      //1. 创建AJAX对象
      const xhr = new XMLHttpRequest();
      //2. 设置请求方法和url
      xhr.open("GET", this.url);
      //3. 发送
      xhr.send();
      //4. 事件绑定 处理服务端返回的结果
      xhr.onreadystatechange = () => {
        // 0（未初始化）1（open方法调用完毕）2（send方法调用完毕）3（服务端返回部分结果）4（服务端返回所有结果）
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            //处理服务端响应结果： 行 头  空行 体
            //1. 处理响应行
            this.statusCode = xhr.status;
            this.statusStr = xhr.statusText;
            //2. 所有响应头
            this.responseHeader = xhr.getAllResponseHeaders();
            //3. 响应体
            this.responseContent = xhr.response;
            // 显示结果
            this.isSuccess = true;
            // 进度条
            this.$Progress.finish();
            // 弹窗
            this.$toast.success("Successfully received reply!", "OK", {
              position: "bottomRight",
              timeout: 3000,
            });
            console.log(this.$toast.success);
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
          } else {
            // 进度条
            this.$Progress.fail();
            // 弹窗
            this.$toast.error("Sending request failed", "Fail", {
              position: "bottomRight",
              timeout: 3000,
            });
          }
        }
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
