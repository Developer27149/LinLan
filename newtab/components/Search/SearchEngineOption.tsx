import type { ESearchEngine } from "~newtab/interfaces"
import { iconMapRecord } from "."
import { motion } from "framer-motion"
import { useState } from "react"
import { useStore } from "~stores"

function SearchEngineOption() {
  const { setBasicConfig, basicConfig } = useStore()
  // const variants = {
  //   open: {
  //     opacity: 1,
  //     x: 0
  //   },
  //   closed: {
  //     opacity: 0,
  //     x: "-100%"
  //   }
  // }
  const onChangeSearchOption = (value: ESearchEngine) => {
    setBasicConfig({ ...basicConfig, searchEngine: value })
  }
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      // animate={isShow ? "open" : "closed"}
      // variants={variants}
      className="flex gap-2 items-center bg-[#3918d11a] text-black p-2 ml-1 rounded-sm mr-1.5 mb-1">
      {Object.entries(iconMapRecord).map(([key, value], idx) => (
        <button key={idx} onClick={() => onChangeSearchOption(key)}>
          {value}
        </button>
      ))}
    </motion.div>
  )
}

export default SearchEngineOption
