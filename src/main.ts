import "es6-promise/auto";
import { createApp } from "vue";
import { defineRule } from "vee-validate";
import { required, min, max, image, alpha_spaces } from "@vee-validate/rules";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store, key } from "./store";

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("image", image);
defineRule("alpha_spaces", alpha_spaces);

createApp(App).use(router).use(store, key).mount("#app");
