import { HTMLAttributes, useEffect } from "react"

import { motion } from "framer-motion"
import { onSearchKeyword } from "~utils/search"
import { useStore } from "~stores"

interface IProps extends HTMLAttributes<HTMLDivElement> {
  options: string[]
}

function SearchKeywordOption({ options, ...other }: IProps) {
  const { basicConfig } = useStore()
  const onSearch = (value: string) => {
    onSearchKeyword(
      value,
      basicConfig.searchEngine,
      basicConfig.openSearchResultStyle
    )
  }
  const keyOptions = ['u', 'j', 'm']

  useEffect(() => {
    // 监听快捷键,直接跳转
    document.addEventListener('keypress', (e) => {
      const {key, ctrlKey} = e;
      const target = options[keyOptions.findIndex(i => i === key)]
      if(ctrlKey && keyOptions.includes(key) && target){
        onSearch(target)
      }    
    })
  })

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
        {options.map((value, idx) => (
          <li
            key={value}
            onClick={() => onSearch(value)}
            className="cursor-pointer hover:bg-purple-100 p-1 rounded-sm">
            <span className="text-gray-300 pr-4">{keyOptions[idx] ?? ''}</span>
            {value}
          </li>
        ))}
      </ul>
      <div className="text-[12px] text-purple-400 text-end">ctrl + ?</div>
    </motion.div>
  )
}

export default SearchKeywordOption
