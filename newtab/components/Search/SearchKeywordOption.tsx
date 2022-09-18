import type { HTMLAttributes, SetStateAction } from "react"

import { createSecretKey } from "crypto"
import { motion } from "framer-motion"
import { onSearchKeyword } from "~utils/search"
import { useStore } from "~stores"

interface IProps extends HTMLAttributes<HTMLDivElement> {
  options: string[]
}

function SearchKeywordOption({ options, setKeyword, ...other }: IProps) {
  const { basicConfig, setBasicConfig } = useStore()
  const onSearch = (value: string) => {
    onSearchKeyword(
      value,
      basicConfig.searchEngine,
      basicConfig.openSearchResultStyle
    )
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
      {...other}
      className="flex flex-col gap-2 p-2 ">
      <ul>
        {options.map((value) => (
          <li
            key={value}
            onClick={() => onSearch(value)}
            className="cursor-pointer hover:bg-purple-100 p-1 rounded-sm">
            {value}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default SearchKeywordOption
