import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;
const { persistAtom } = recoilPersist({ key: "test", storage: sessionStorage });

// 유저 State
const keywordState = atom({
  key: "keyword",
  default: "",
});
export { keywordState };
