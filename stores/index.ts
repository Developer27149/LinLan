import { atom } from "jotai"

export const wallpaperAtom = atom(
  // init bing wallpaper
  // "https://cn.bing.com//th?id=OHR.MidAutumn2022_EN-CN4175264410_UHD.jpg"
  "https://images.unsplash.com/photo-1503944168849-8bf86875bbd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3874&q=80"
)
export const searchEngineAtom = atom("google")

export const bingSuggestionRecordAtom = atom({})

export const basicConfigAtom = atom({})
