import { IPage, PAGES } from "@/components/BaseNav.models";
import { auth, firestore } from "@/firebase";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IDocument, IState } from "./models";
import mutations from "./mutations";
import { upload } from "../utils/storage";

export const key: InjectionKey<Store<IState>> = Symbol();

const getTags = (page: IPage, tags: string[] = []): string[] => {
  if (page.url) {
    tags.push(page.url);
    return tags;
  }

  if (page.children) {
    for (let i = 0; i < page.children.length; i++) {
      const element = page.children[i];

      getTags(element, tags);
    }
  }

  return tags;
};

export const store = createStore<IState>({
  strict: process.env.NODE_ENV !== "production",
  state() {
    return {
      documents: [],
      uid: null,
      tags: [...getTags(PAGES[0]), ...getTags(PAGES[1])],
      error: null,
    };
  },
  mutations: {
    [mutations.SAVE_UID](state: IState, uid: string) {
      state.uid = uid;
    },
    [mutations.CLEAR_UID](state: IState) {
      state.uid = null;
    },
    [mutations.ADD_DOCUMENT](state: IState, document: IDocument) {
      const existingDoc = state.documents.find((doc) => doc.id === document.id);

      if (!existingDoc) {
        state.documents.push(document);
      }
    },
    [mutations.SET_ERROR_MSG](state: IState, msg: string) {
      state.error = msg;
    },
    [mutations.CLEAR_ERROR_MSG](state: IState) {
      state.error = null;
    },
  },
  getters: {
    isUserLoggedIn(state) {
      return !!state.uid;
    },
  },
  actions: {
    createDocument: async ({ commit }, document: IDocument) => {
      try {
        if (!document.file) {
          throw new Error("Missing upload file");
        }

        const docRef = await firestore.collection("documents").add({
          title: document.title,
          description: document.description,
          tag: document.tag,
        });

        const url = await upload(
          document.file,
          docRef.id,
          document.tag,
          document.title,
          document.description || ""
        );

        await firestore.collection("documents").doc(docRef.id).update({
          url,
        });

        const newDocument: IDocument = {
          id: docRef.id,
          tag: document.tag,
          title: document.title,
          description: document.description,
          url,
        };

        commit(mutations.ADD_DOCUMENT, newDocument);
      } catch (e) {
        commit(mutations.SET_ERROR_MSG, "Unable to create document");
        throw e;
      }
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
