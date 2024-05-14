import VueRouter from "vue-router";

import Raw_AJAX from "@/pages/Raw_AJAX";
import Raw_AJAX_GET from "@/pages/Raw_AJAX_GET";
import Raw_AJAX_POST from "@/pages/Raw_AJAX_POST";
import Raw_AJAX_JSON from "@/pages/Raw_AJAX_JSON";
import Raw_AJAX_IE from "@/pages/Raw_AJAX_IE";
import Raw_AJAX_Delay from "@/pages/Raw_AJAX_Delay";

import JQuery_AJAX from "@/pages/JQuery_AJAX";

import Axios_AJAX from "@/pages/Axios_AJAX";

import Fetch_AJAX from "@/pages/Fetch_AJAX";

import KuaYu from "@/pages/KuaYu";
import KuaYu_JSONP from "@/pages/KuaYu_JSONP";
import KuaYu_JSONP_JQuery from "@/pages/KuaYu_JSONP_JQuery";

export default new VueRouter({
  routes: [
    {
      path: "/rawajax",
      component: Raw_AJAX,
      children: [
        {
          path: "get",
          component: Raw_AJAX_GET,
        },
        {
          path: "post",
          component: Raw_AJAX_POST,
        },
        {
          path: "json",
          component: Raw_AJAX_JSON,
        },
        {
          path: "ie",
          component: Raw_AJAX_IE,
        },
        {
          path: "delay",
          component: Raw_AJAX_Delay,
        },
      ],
    },
    {
      path: "/jqueryajax",
      component: JQuery_AJAX,
    },
    {
      path: "/axiosajax",
      component: Axios_AJAX,
    },
    {
      path: "/fetchajax",
      component: Fetch_AJAX,
    },
    {
      path: "/kuayu",
      component: KuaYu,
      children: [
        {
          path: "jsonp",
          component: KuaYu_JSONP,
        },
        {
          path: "jsonp_jquery",
          component: KuaYu_JSONP_JQuery,
        },
      ],
    },
  ],
});
