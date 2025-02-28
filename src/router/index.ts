import { createRouter, createWebHistory } from "vue-router";
import { COCKTAIL_CODES } from "../types/cocktail";
import type { CocktailCode } from "../types/cocktail";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: `/${COCKTAIL_CODES[0]}`,
    },
    {
      path: "/:code",
      name: "cocktail",
      component: () => import("../views/CocktailView.vue"),
      props: true,
    beforeEnter: (to, _from, next) => {
        const code = to.params.code as string;
        if (COCKTAIL_CODES.includes(code as CocktailCode)) {
          next();
        } else {
          next("/404");
        }
      },
    },
    {
      path: "/404",
      name: "not-found",
      component: () => import("../views/NotFoundView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/404",
    },
  ],
});

export default router;
