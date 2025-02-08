import { atom } from "recoil";
import { getGlobalState, } from "../lib/sol-program";

export const GlobalStateState = atom({
    key: "GLOBAL_STATE",
    default: new Promise(async (set) => {
        set(await getGlobalState())
    })
})