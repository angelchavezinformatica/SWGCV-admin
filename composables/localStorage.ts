import { ref, type Ref } from "vue";

export const useLocalStorage = <T>(initial: T, key: string) => {
  const getState = () => {
    const storage: string | null = localStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage).key as T;
    }
    localStorage.setItem(key, JSON.stringify({ key: initial }));
    return initial;
  };

  const state: Ref<T> = ref<T>(getState()) as Ref<T>;

  const setState = (value: T) => {
    state.value = value;
    localStorage.setItem(key, JSON.stringify({ key: value }));
  };

  return { state, getState, setState };
};
