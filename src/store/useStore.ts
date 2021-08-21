import { Store, useStore as baseUseStore } from "vuex";
import { key } from "./";
import { IState } from "./models";

export function useStore(): Store<IState> {
  return baseUseStore<IState>(key);
}
