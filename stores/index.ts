import {
  BASIC_CONFIG,
  BING_SUGGESTION,
  DEFAULT_WALLPAPER,
  WALLPAPER
} from "~newtab/constants"
import {
  EArea,
  EOpenNewWindowForSearch,
  ESearchEngine,
  IBasicConfig
} from "~newtab/interfaces"

import { useState } from "react"
// import { atom } from "jotai"
import { useStorage } from "@plasmohq/storage"

// export const wallpaperAtom = atom(
//   // init bing wallpaper
//   // "https://cn.bing.com//th?id=OHR.MidAutumn2022_EN-CN4175264410_UHD.jpg"
//   "https://images.unsplash.com/photo-1503944168849-8bf86875bbd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3874&q=80"
// )
// export const searchEngineAtom = atom("google")

// export const bingSuggestionRecordAtom = atom({})

// export const basicConfigAtom = atom({})

type TSetState = IBasicConfig | Function

export const useStore = () => {
  const [bingSuggestion, setBingSuggestion] = useStorage(
    { key: BING_SUGGESTION, area: EArea.local },
    {}
  )
  const [wallpaper, setWallpaper] = useStorage(
    { key: WALLPAPER, area: EArea.local },
    DEFAULT_WALLPAPER
  )

  const [basicConfig, _setBasicConfig] = useStorage<IBasicConfig>(
    {
      key: BASIC_CONFIG,
      area: EArea.sync
    },
    {
      lastUpdateTime: new Date().valueOf(),
      hadInit: false,
      searchEngine: ESearchEngine.google,
      openSearchResultStyle: EOpenNewWindowForSearch._self
    }
  )

  const setBasicConfig = (value: TSetState) => {
    if (typeof value === "function") {
      value(basicConfig)
    } else {
      _setBasicConfig(value)
    }
  }

  return {
    bingSuggestion,
    setBingSuggestion,
    wallpaper,
    setWallpaper,
    basicConfig,
    setBasicConfig
  }
}
