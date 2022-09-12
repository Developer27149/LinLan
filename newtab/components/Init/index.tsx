import { DEFAULT_WALLPAPER, SEARCH_ENGINE, WALLPAPER } from "~newtab/constants"
import { ToastContainer, toast } from "react-toastify"
import { useEffect, useRef, useState } from "react"

import { getWallpaperBase64FromUrl } from "~utils/image"
import { sleepDelay } from "~utils"
import { useStorage } from "@plasmohq/storage"

function InitPage() {
  const [searchEngine, setSearchEngine] = useStorage(SEARCH_ENGINE, "Google")
  const [wallpaper, setWallpaper] = useStorage(WALLPAPER, DEFAULT_WALLPAPER)
  const [isFinish, setIsFinish] = useState(false)

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
      console.log(base64)

      console.log("res", res)

      setWallpaper(res)
    })()
  }, [])
  return (
    <div
      className="z-[999] fixed left-0 right-0 bottom-0 top-0 flex justify-center items-center flex-col gap-4"
      style={{
        background: "linear-gradient(to right, #7f00ff, #e100ff)"
      }}>
      <fieldset>
        <legend>你常用的搜索引擎:</legend>
        <div className="my-2">
          <input
            type="radio"
            id="Google"
            name="drone"
            value="Google"
            onChange={(e) => {
              setSearchEngine(e.target.value)
            }}
          />
          <label className="pl-2" htmlFor="Google">
            Google
          </label>
        </div>
        <div className="my-2">
          <input
            type="radio"
            id="Bing"
            name="drone"
            value="Bing"
            onChange={(e) => {
              setSearchEngine(e.target.value)
            }}
          />
          <label className="pl-2" htmlFor="Bing">
            必应
          </label>
        </div>

        <div className="my-2">
          <input
            type="radio"
            id="ZhiHu"
            name="drone"
            value="ZhiHu"
            onChange={(e) => {
              setSearchEngine(e.target.value)
            }}
          />
          <label className="pl-2" htmlFor="ZhiHu">
            知乎
          </label>
        </div>
      </fieldset>
      <ToastContainer />
    </div>
  )
}

export default InitPage
