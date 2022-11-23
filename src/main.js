import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "../src/assets/base.less";
import "../src/assets/iconfont";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
