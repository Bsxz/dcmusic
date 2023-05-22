import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to) => {
  if (to.href === "/notfound") {
    document.title = to.meta.title;
  }
});
export default router;
