import { DEFAULT_WALLPAPER, WALLPAPER } from "~newtab/constants"

import { getItemByKeyFromStorage } from "~utils"
import { useAtom } from "jotai"
import { useStorage } from "@plasmohq/storage"
import { wallpaperAtom } from "~stores"

function wallpaper() {
  const [wallpaper] = useStorage({ key: WALLPAPER, area: "local" })

  return (
    <div
      style={{
        backgroundImage: `url(${wallpaper})`
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-no-repeat bg-cover "></div>
  )
}

export default wallpaper
