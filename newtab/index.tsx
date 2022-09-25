import "../style.css"
import "react-toastify/dist/ReactToastify.css"

import {
  BASIC_CONFIG,
  BING_SUGGESTION,
  DEFAULT_WALLPAPER,
  WALLPAPER
} from "./constants"
import { EArea, ESearchEngine, IBasicConfig } from "./interfaces"
import { basicConfigAtom, bingSuggestionRecordAtom, useStore } from "~stores"
import { getItemByKeyFromStorage, setDataIntoStorage } from "~utils"
import { useEffect, useState } from "react"

import InitPage from "./components/Init"
import Search from "./components/Search"
import { ToastContainer } from "react-toastify"
import Wallpaper from "./components/Wallpaper"
import WallpaperList from "./components/Wallpaper/WallpaperList"

function IndexNewtab() {
  const [loading, setLoading] = useState(true)
  const { wallpaper, basicConfig, setBasicConfig } = useStore()

  useEffect(() => {
    // 获取壁纸数据
    getItemByKeyFromStorage(WALLPAPER).then((value) => {
      setLoading(false)
    })
    // TODO:发布之前去掉这个方法
    // 初始化提供一个重置状态的测试方法
    window.reset = () =>
      setBasicConfig({
        ...basicConfig,
        hadInit: false,
        searchEngine: ESearchEngine.google
      })
  }, [])
  useEffect(() => {
    // TODO:调试变量
    window.b = basicConfig
  }, [basicConfig])
  // 加载中
  if (loading) return null
  if (basicConfig.hadInit === false) return <InitPage />
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Wallpaper />
      <Search />
      <WallpaperList />
      <ToastContainer />
    </div>
  )
}

export default IndexNewtab
