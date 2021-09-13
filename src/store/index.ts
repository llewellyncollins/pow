import { IPage, PAGES } from "@/components/BaseNav.models";
import { auth, firestore } from "@/firebase";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { IDocument, IState } from "./models";
import mutations from "./mutations";
import { deleteImage, upload } from "../utils/storage";

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
    [mutations.DELETE_DOCUMENT](state: IState, docId: string) {
      const documentIndex = state.documents.findIndex(
        (doc) => doc.id === docId
      );

      if (documentIndex !== -1) {
        state.documents.splice(documentIndex, 1);
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

        try {
          const [url, imagePath] = await upload(
            document.file,
            docRef.id,
            document.tag,
            document.title,
            document.description || ""
          );

          await firestore.collection("documents").doc(docRef.id).update({
            url,
            imagePath,
          });

          const newDocument: IDocument = {
            id: docRef.id,
            tag: document.tag,
            title: document.title,
            description: document.description,
            url,
          };

          commit(mutations.ADD_DOCUMENT, newDocument);
        } catch (error) {
          firestore.collection("documents").doc(docRef.id).delete();
          throw error;
        }
      } catch (error) {
        commit(mutations.SET_ERROR_MSG, "Unable to create document");
        throw error;
      }
    },
    getDocuments: async ({ commit }) => {
      try {
        firestore
          .collection("documents")
          .where("url", "!=", null)
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              const newDocument: IDocument = {
                id: doc.id,
                tag: data.tag,
                title: data.title,
                description: data.description,
                url: data.url,
                imagePath: data.imagePath,
              };
              commit(mutations.ADD_DOCUMENT, newDocument);
            });
          });
      } catch (error) {
        commit(mutations.SET_ERROR_MSG, "Unable retreive documents");
      }
    },
    deleteDocument: async ({ commit }, { docId, imagePath }) => {
      try {
        await firestore.collection("documents").doc(docId).delete();
        await deleteImage(imagePath);
        commit(mutations.DELETE_DOCUMENT, docId);
      } catch (error) {
        commit(mutations.SET_ERROR_MSG, "Unable to delete document");
        throw error;
      }
    },
    signOut({ commit }) {
      auth.signOut().then(() => commit(mutations.CLEAR_UID));
    },
  },
});
