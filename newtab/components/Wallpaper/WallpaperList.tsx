import { getWallpaperBase64FromUrl, shouldFetchNewData } from "~utils/image"
import { useEffect, useState } from "react"

import type { IThisWeekData } from "~newtab/interfaces"
import Loading from "../Loading"
import { WALLPAPER } from "~newtab/constants"
import { getThisWeekData } from "~request"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { unionWith } from "lodash-es"
import useQuery from "~newtab/hooks/useQuery"
import { useStore } from "~stores"

function WallpaperList() {
  const [showWallpaperSelect, setShowWallpaperSelect] = useState(false)
  const { bingWallpaperListRecord, setBingWallpaperListRecord, setWallpaper } =
    useStore()
  const { run, data, isError, isLoading } = useQuery<IThisWeekData>(
    getThisWeekData,
    {
      auto: false,
      onSuccess: (res) => {
        // 成功后更新到本地数据
        const newResult = unionWith(
          bingWallpaperListRecord,
          res.images,
          (prev, cur) => prev.urlbase === cur.urlbase
        )
        setBingWallpaperListRecord(newResult)
      },
      onError: (e) => {
        console.log(e)
      }
    }
  )

  /**
   * 描述 监听按 . 触发打开壁纸选择功能
   * @date 2022-09-24
   * @param {any} e:KeyboardEvent
   * @returns {any}
   */
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "." && !showWallpaperSelect) {
      // 展开壁纸选择功能
      setShowWallpaperSelect((v) => !v)
      // 如果今天有记录，就使用记录
      if (shouldFetchNewData(bingWallpaperListRecord.timestamp)) {
        console.log("res data:", data)
      } else {
        console.log("使用旧的数据")
        run()
      }
    }
  }

  /**
   * 描述 退出壁纸选择功能，并且防止点击穿透
   * @date 2022-09-24
   * @param {any} e:MouseEvent
   * @returns {any}
   */
  const onExitSelect = (e: MouseEvent) => {
    e.stopPropagation()
    setShowWallpaperSelect(false)
  }

  /**
   * 描述 通过url去获取二进制数据，用 base64 格式存到 storage 并且更新壁纸，关闭选择壁纸选择功能
   * @date 2022-09-24
   * @param {any} url:string
   * @returns {any}
   */
  const onSelectWallpaperByUrl = async (url: string) => {
    const base64 = await toast.promise(getWallpaperBase64FromUrl(url), {
      pending: "正在获取壁纸数据",
      success: "壁纸数据OK 👌",
      error: "出了点问题 🤯"
    })
    const res = `data:image/jpeg;charset=utf-8;base64,${base64.replace(
      "data:application/octet-stream;base64,",
      ""
    )}`
    /**
     * 不知道为何 useStorage 无法实现无限制的storage存储，使用自带的方法将会触发存储量超额警告
     */
    // setWallpaper(res)
    chrome.storage.local.set({ [WALLPAPER]: `"${res}"` })
  }

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return showWallpaperSelect ? (
    <div
      className="fixed left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-[#000000b0] z-50"
      onClick={onExitSelect}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {/* <motion.h4 */}
          {/*   initial={{ */}
          {/*     opacity: 0, */}
          {/*     top: -100 */}
          {/*   }} */}
          {/*   animate={{ */}
          {/*     opacity: 1, */}
          {/*     top: 0 */}
          {/*   }} */}
          {/*   className="font-bold text-lg text-center text-white relative"> */}
          {/*   点击即可启用 */}
          {/* </motion.h4> */}
          <div className="grid max-w-[90vw] grid-cols-3 gap-8 p-8">
            {data.images.map(({ urlbase }) => {
              return (
                // <picture key={urlbase}>
                //   <source
                //     media="(max-width: 1920px)"
                //     srcSet={`https://cn.bing.com${urlbase}_960x540.jpg`}
                //   />
                //   <img src={`https://cn.bing.com${urlbase}_UHD.jpg`} alt="" />
                // </picture>
                <img
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectWallpaperByUrl(
                      `https://cn.bing.com${urlbase}_UHD.jpg`
                    )
                  }}
                  className="cursor-pointer"
                  src={`https://cn.bing.com${urlbase}_1920x1080.jpg`}
                  alt=""
                  key={urlbase}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  ) : null
}

export default WallpaperList
