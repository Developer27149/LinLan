import type { HTMLAttributes } from "react"
import { motion } from "framer-motion"
import { useStore } from "~stores"

interface IProps extends HTMLAttributes<HTMLDivElement> {
  options: string[]
}

function SearchKeywordOption({ options, ...other }: IProps) {
  const { basicConfig, setBasicConfig } = useStore()
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
      className="flex gap-2 items-center bg-gray-600 text-white p-2 ml-1 rounded-sm mr-1.5 mb-1">
      {Object.entries(iconMapRecord).map(([key, value], idx) => (
        <button key={idx} onClick={() => onChangeSearchOption(key)}>
          {value}
        </button>
      ))}
    </motion.div>
  )
}

export default SearchKeywordOption
