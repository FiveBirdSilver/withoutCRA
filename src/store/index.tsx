import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;
const { persistAtom } = recoilPersist({ key: "yeh", storage: sessionStorage });
// 로컬 스토리지에 저장하고 싶을 경우 const { persistAtom } = recoilPersist()

// 유저 State
const positionState = atom({
  key: "positionState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export { positionState };
