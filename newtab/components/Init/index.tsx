import { ChangeEvent, useEffect, useRef, useState } from "react"
import { DEFAULT_WALLPAPER, SEARCH_ENGINE, WALLPAPER } from "~newtab/constants"
import {
  EArea,
  EOpenNewWindowForSearch,
  ESearchEngine
} from "~newtab/interfaces"
import { ToastContainer, toast } from "react-toastify"
import { setDataIntoStorage, sleepDelay } from "~utils"

import Button from "../Button"
import { GrLinkNext } from "react-icons/gr"
import { getWallpaperBase64FromUrl } from "~utils/image"
import { useStore } from "~stores"

function InitPage() {
  const { basicConfig, setWallpaper, setBasicConfig, wallpaper } = useStore()
  const searchEngineList = [
    { name: "谷歌", value: ESearchEngine.google },
    { name: "必应", value: ESearchEngine.bing },
    { name: "知乎", value: ESearchEngine.zhihu }
  ]
  const openStyleList = [
    {
      name: "当前页",
      value: EOpenNewWindowForSearch._self
    },
    {
      name: "新标签页",
      value: EOpenNewWindowForSearch._blank
    }
  ]
  const [isPrepared, setIsPrepared] = useState(false)

  useEffect(() => {
    // 下载图像
    ;(async () => {
      const base64 = await toast.promise(
        getWallpaperBase64FromUrl(DEFAULT_WALLPAPER),
        {
          pending: "正在获取壁纸数据",
          success: "壁纸数据OK 👌",
          error: "出了点问题 🤯"
        }
      )
      const res = `data:image/jpeg;charset=utf-8;base64,${base64.replace(
        "data:application/octet-stream;base64,",
        ""
      )}`
      setWallpaper(res)
    })()
    console.log("basicConfig:", basicConfig)
  }, [])

  const onChangeSearchEngine = (e: ChangeEvent<HTMLInputElement>) => {
    setBasicConfig({ ...basicConfig, searchEngine: e.target.value })
  }
  const onChangeOpenStyle = (e: ChangeEvent<HTMLInputElement>) => {
    setBasicConfig({
      ...basicConfig,
      openSearchResultStyle: e.target.value
    })
  }
  const onFinish = () => {
    setBasicConfig({ ...basicConfig, hadInit: true })
  }

  return (
    <div
      className="z-[999] fixed left-0 right-0 bottom-0 top-0 flex justify-center items-center flex-col gap-4 text-white"
      style={{
        background: "linear-gradient(to right, #7f00ff, #e100ff)"
      }}>
      <form>
        <fieldset>
          <legend className="text-lg">你常用的搜索引擎:</legend>
          {searchEngineList.map(({ name, value }, idx) => (
            <div className="my-2" key={idx}>
              <input
                type="radio"
                id={value}
                name="drone"
                value={value}
                onChange={onChangeSearchEngine}
                defaultChecked={idx === 0}
              />
              <label className="pl-2" htmlFor={value}>
                {name}
              </label>
            </div>
          ))}
        </fieldset>
      </form>
      <form>
        <fieldset>
          <legend className="text-lg">搜索结果打开方式:</legend>
          {openStyleList.map(({ name, value }, idx) => (
            <div className="my-2" key={idx}>
              <input
                type="radio"
                id={value}
                name="drone"
                value={value}
                onChange={onChangeOpenStyle}
                defaultChecked={idx === 0}
              />
              <label className="pl-2" htmlFor={value}>
                {name}
              </label>
            </div>
          ))}
        </fieldset>
      </form>

      <ToastContainer />
      {wallpaper !== DEFAULT_WALLPAPER && (
        <Button
          onClick={onFinish}
          className="text-black fixed right-12 bottom-12"
          prefix={<GrLinkNext className="w-2 opacity-80" />}>
          一切就绪
        </Button>
      )}
    </div>
  )
}

export default InitPage
