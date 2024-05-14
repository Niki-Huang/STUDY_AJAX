<template>
  <div class="row">
    <div class="col-3">
      <!-- 导航 -->
      <div
        class="nav flex-column nav-pills"
        id="v-pills-tab"
        role="tablist"
        aria-orientation="vertical"
      >
        <router-link
          :class="['nav-link', active_router == router.id ? 'active' : '']"
          id="v-pills-home-tab"
          data-toggle="pill"
          data-target="#v-pills-home"
          type="button"
          role="tab"
          aria-controls="v-pills-home"
          aria-selected="true"
          v-for="router in routers"
          :key="router.id"
          :to="router.to"
          @click.native="active_router = router.id"
        >
          {{ router.text }}
        </router-link>
      </div>
    </div>
    <!-- 内容 -->
    <div class="col-9">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "KuaYu",
  data() {
    return {
      active_router: "router1",
      routers: [
        {
          id: "router1",
          to: "/kuayu/jsonp",
          text: "原生JSONP",
        },
        {
          id: "router2",
          to: "/kuayu/jsonp_jquery",
          text: "JQuery的JSONP",
        },
      ],
    };
  },
};
</script>

<style scoped>
button {
  margin-bottom: 10px;
}
</style>
