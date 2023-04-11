import { isBrowser } from "framer-motion";
import { atom } from "jotai";

const atomWithLocalStorage = <T>(key: string, initialValue: T) => {
  const getInitialValue = () => {
    if (isBrowser) {
      const item = localStorage.getItem(key);
      if (item !== null) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(item);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return initialValue;
  };
  const baseAtom = atom(getInitialValue());
  const derivedAtom = atom(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (get) => get<T>(baseAtom),
    (get, set, update) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const nextValue =
        typeof update === "function" ? update(get(baseAtom)) : update;
      set(baseAtom, nextValue);
      localStorage.setItem(key, JSON.stringify(nextValue));
    }
  );
  return derivedAtom;
};

export const accessTokenAtom = atomWithLocalStorage<string>("accessToken", "");
export const refreshTokenAtom = atomWithLocalStorage<string>(
  "refreshToken",
  ""
);
