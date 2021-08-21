import { auth } from "@/firebase";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IPage, IState } from "./models";
import mutations from "./mutations";

export const key: InjectionKey<Store<IState>> = Symbol();

export const store = createStore<IState>({
  strict: process.env.NODE_ENV !== "production",
  state() {
    return {
      pages: [],
      uid: null,
    };
  },
  mutations: {
    [mutations.SAVE_UID](state: IState, uid: string) {
      state.uid = uid;
    },
    [mutations.CLEAR_UID](state: IState) {
      state.uid = null;
    },
    [mutations.ADD_PAGE](state: IState, page: IPage) {
      state.pages.push(page);
    },
  },
  actions: {
    createPage({ commit }, page: IPage) {
      return new Promise((resolve) => {
        console.log("save to firebase");
      });
    },
    getPages({ commit }, tag: string) {
      return new Promise((resolve) => {
        console.log("fetch from firebase");
      });
    },
    signOut({ commit }) {
      auth.signOut().then(() => commit(mutations.CLEAR_UID));
    },
  },
});
