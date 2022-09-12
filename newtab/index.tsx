import "../style.css"
import "react-toastify/dist/ReactToastify.css"

import {
  BASIC_CONFIG,
  BING_SUGGESTION,
  DEFAULT_WALLPAPER,
  WALLPAPER
} from "./constants"
import { basicConfigAtom, bingSuggestionRecordAtom } from "~stores"
import { getItemByKeyFromStorage, setDataIntoStorage } from "~utils"
import { useEffect, useState } from "react"

import type { IBasicConfig } from "./interfaces"
import InitPage from "./components/Init"
import Search from "./components/Search"
import Wallpaper from "./components/Wallpaper"
import { useAtom } from "jotai"
import { useStorage } from "@plasmohq/storage"

function IndexNewtab() {
  const [bingSuggestion, setBingSuggestion] = useAtom(bingSuggestionRecordAtom)
  const [config, setConfig] = useAtom(basicConfigAtom)
  const [hasInit, setHasInit] = useState(false)
  const [wallpaper] = useStorage(
    { key: WALLPAPER, area: "local" },
    DEFAULT_WALLPAPER
  )
  console.log("wallpaper:", wallpaper)

  // 初始化壁纸
  const [basicConfig] = useStorage<IBasicConfig>(BASIC_CONFIG, {
    lastUpdateTime: new Date().valueOf()
  })

  // useEffect(() => {
  //   // 初始化基础设置
  //   getItemByKeyFromStorage(BASIC_CONFIG).then((data) => {
  //     setConfig({ lastUpdateTime: new Date().valueOf(), ...data })
  //   })
  // }, [])

  useEffect(() => {
    // 观察store
    window.bs = bingSuggestion
    setDataIntoStorage({ [BING_SUGGESTION]: bingSuggestion })
  }, [bingSuggestion])

  if (wallpaper === DEFAULT_WALLPAPER) return <InitPage />
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Wallpaper />
      <Search />
    </div>
  )
}

export default IndexNewtab
