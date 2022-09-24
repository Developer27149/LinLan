import { DEFAULT_WALLPAPER, WALLPAPER } from "~newtab/constants"

import WallpaperList from "./WallpaperList"
import { getItemByKeyFromStorage } from "~utils"
import { useStore } from "~stores"

function wallpaper() {
  const { wallpaper } = useStore()
  return (
    <div
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "100% 100%"
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-no-repeat"></div>
  )
}

export default wallpaper
