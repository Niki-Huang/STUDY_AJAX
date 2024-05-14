<template>
  <div id="app" class="container">
    <!-- 发送请求时的进度条 -->
    <vue-progress-bar></vue-progress-bar>
    <!-- 局域网内手机平板调试 -->
    <div class="input-group top">
      <div class="custom-file">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">
            服务器的ip地址（用于手机平板调试）
          </span>
        </div>
        <input
          type="text"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          v-model="mobileurl"
        />
      </div>
    </div>
    <!-- 导航 -->
    <nav class="nav nav-pills nav-fill">
      <router-link
        v-for="(router, index) in routers"
        :class="['nav-link', active_router == router.id ? 'active' : '']"
        :key="index"
        :to="router.to"
        @click.native="active_router = router.id"
      >
        {{ router.text }}
      </router-link>
    </nav>
    <!-- 内容 -->
    <keep-alive>
      <router-view class="content"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      mobileurl: (localStorage.getItem("mobileurl") || "192.168.0.1").trim(),
      active_router: "router1",
      routers: [
        {
          id: "router1",
          to: "/rawajax",
          text: "原生AJAX",
        },
        {
          id: "router2",
          to: "/jqueryajax",
          text: "JQuery中的AJAX",
        },
        {
          id: "router3",
          to: "/axiosajax",
          text: "Axios中的AJAX",
        },
        {
          id: "router4",
          to: "/fetchajax",
          text: "Fetch中的AJAX",
        },
        {
          id: "router5",
          to: "/kuayu",
          text: "跨域问题",
        },
      ],
    };
  },
  mounted() {
    if (!localStorage.getItem("mobileurl")) localStorage.setItem("mobileurl", this.mobileurl);
    else this.mobileurl = localStorage.getItem("mobileurl");
    this.__proto__.__proto__.mobileurl = `http://${this.mobileurl}:8000/`;
  },
  watch: {
    mobileurl(newValue, oldValue) {
      localStorage.setItem("mobileurl", newValue);
      this.__proto__.__proto__.mobileurl = `http://${newValue}:8000/`;
    },
  },
};
</script>

<style scoped>
#app {
  margin-top: 40px;
}
.content {
  margin-top: 20px;
}
.top {
  margin-bottom: 20px;
}
</style>
