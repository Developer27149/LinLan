import { DEFAULT_WALLPAPER, WALLPAPER } from "~newtab/constants"

import { EArea } from "~newtab/interfaces"
import WallpaperList from "./WallpaperList"
import { getItemByKeyFromStorage } from "~utils"
import { useStorage } from "@plasmohq/storage"
import { useStore } from "~stores"

function wallpaper() {
  const { wallpaper } = useStore()
  if (wallpaper === undefined) return null
  return (
    <div
      style={{
        backgroundSize: "100% 100%",
        backgroundImage: `url(${wallpaper})`
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-no-repeat"></div>
  )
}

export default wallpaper
