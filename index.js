import "./src/views/todo-view";

import { Router } from "@vaadin/router";

window.addEventListener("load", () => {
  initRouter();
});

const initRouter = () => {
  const router = new Router(document.querySelector("main"));
  router.setRoutes([
    {
      path: "/",
      component: "todo-view",
    },
    {
      path: "/stats",
      component: "stats-view",
      action: () =>
        import(/* webpackChunkName: "stats" */ "./src/views/stats-view"),
    },
    {
      path: "(.*)",
      component: "not-found-view",
      action: () =>
        import(
          /* webpackChunkName: "not-found-view" */ "./src/views/not-found-view"
        ),
    },
  ]);
};
