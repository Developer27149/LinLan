import {
  BASIC_CONFIG,
  BING_SUGGESTION,
  DEFAULT_WALLPAPER,
  WALLPAPER,
  WALLPAPER_BING_LIST
} from "~newtab/constants"
import {
  EArea,
  EOpenNewWindowForSearch,
  ESearchEngine,
  IBasicConfig,
  IBingWallpaperStore
} from "~newtab/interfaces"

import { useState } from "react"
import { useStorage } from "@plasmohq/storage"

type TSetState = IBasicConfig | Function

export const useStore = () => {
  const [bingSuggestion, , { setStoreValue: setBingSuggestion }] = useStorage(
    { key: BING_SUGGESTION, area: EArea.local },
    {}
  )
  const [
    wallpaper,
    ,
    { setStoreValue: setWallpaper, setRenderValue: setWallpaperByRender }
  ] = useStorage({
    key: WALLPAPER,
    area: EArea.local,
    isSecret: true
  })

  const [
    bingWallpaperListRecord,
    ,
    { setStoreValue: setBingWallpaperListRecord }
  ] = useStorage<IBingWallpaperStore>(
    {
      key: WALLPAPER_BING_LIST,
      area: EArea.local
    },
    {
      timestamp: new Date().valueOf(),
      data: []
    }
  )

  const [basicConfig, , { setStoreValue: _setBasicConfig }] =
    useStorage<IBasicConfig>(
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
    setWallpaperByRender,
    basicConfig,
    setBasicConfig,
    bingWallpaperListRecord,
    setBingWallpaperListRecord
  }
}
