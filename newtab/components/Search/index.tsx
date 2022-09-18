import { ChangeEvent, useEffect, useRef, useState } from "react"
import { EOpenNewWindowForSearch, ESearchEngine } from "~newtab/interfaces"
import { RiBaiduFill, RiZhihuFill } from "react-icons/ri"
import { bingSuggestionApi, request } from "~request"
import { bingSuggestionRecordAtom, searchEngineAtom, useStore } from "~stores"

import { FcGoogle } from "react-icons/fc"
import SearchEngineOption from "./SearchEngineOption"
import { TbBrandBing } from "react-icons/tb"
import clsx from "clsx"
import { debounce } from "lodash-es"
import { generateSearchUrl } from "~utils/search"
import { motion } from "framer-motion"
import { useAtom } from "jotai"

export const iconMapRecord = {
  [ESearchEngine.google]: <FcGoogle />,
  [ESearchEngine.baidu]: <RiBaiduFill />,
  [ESearchEngine.bing]: <TbBrandBing />,
  [ESearchEngine.zhihu]: <RiZhihuFill />
}

function Search() {
  // const [searchEngine, setSearchEngine] = useAtom(searchEngineAtom)
  // const [bingSuggestion, setBingSuggestion] = useAtom(bingSuggestionRecordAtom)
  const { basicConfig, setBasicConfig, setBingSuggestion, bingSuggestion } =
    useStore()
  const [keyword, setKeyword] = useState("")
  const [suggestList, setSuggestList] = useState([])
  const dragElemRef = useRef<HTMLDivElement>()
  const [hasInit, setHasInit] = useState(false)

  const [showSearchOption, setShowSearchOption] = useState(false)

  const getSuggestionFc = useRef(
    debounce(async (query: string, callback?: () => void) => {
      const res = await bingSuggestionApi(query)
      console.log(res)
      callback?.(res)
    }, 1.5 * 1000)
  )

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  // 定义一个全局函数
  useEffect(() => {
    window.bing = {
      sug: function (json) {
        console.log(json)
      }
    }
    window.sug = function (json) {
      console.log("sug fc:", json)
    }
  }, [])

  useEffect(() => {
    console.log("keyword :", keyword, keyword.length)
    if (keyword.length === 0) return
    // 检查缓存，无缓存则重新请求
    if (bingSuggestion[keyword]) {
      console.log("已存在关键字", keyword)
      console.log(bingSuggestion[keyword])
      setSuggestList(bingSuggestion[keyword])
      return
    }
    // 添加新的缓存
    getSuggestionFc.current?.(keyword.trim(), (dataArr: any[]) => {
      setBingSuggestion({ ...bingSuggestion, [keyword]: dataArr })
      setSuggestList(dataArr)
    })
  }, [keyword])

  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const url = generateSearchUrl(basicConfig.searchEngine, keyword)
      window.open(url, basicConfig?.openSearchResultStyle)
    }
  }

  useEffect(() => {
    // 点击document事件将保证不显式搜索引擎选项
    document.addEventListener("click", () => {
      setShowSearchOption(false)
    })
  }, [])

  useEffect(() => {
    if (
      basicConfig.searchBoxX &&
      basicConfig.searchBoxY &&
      hasInit === false &&
      dragElemRef.current &&
      (~~basicConfig.searchBoxX < 100) & (~~basicConfig.searchBoxY < 100)
    ) {
      // 设置最初的位置
      dragElemRef.current.style.left = `${basicConfig.searchBoxX}%`
      dragElemRef.current.style.top = `${basicConfig.searchBoxY}%`
      setHasInit(true)
    }
  }, [basicConfig, hasInit])

  const onDragEnd = (_: any) => {
    if (dragElemRef.current) {
      const { x, y } = dragElemRef.current.getBoundingClientRect()
      console.log(x / window.innerWidth, y / window.innerHeight)

      setBasicConfig({
        ...basicConfig,
        searchBoxX: (x / window.innerWidth) * 100,
        searchBoxY: (y / window.innerHeight) * 100
      })
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: "-100"
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      drag={true}
      onDragEnd={onDragEnd}
      dragMomentum={false}
      transition="delay-150"
      className={clsx("fixed bg-white z-1 rounded-lg p-1 focus:shadow-sm")}
      ref={dragElemRef}>
      <div
        className="absolute right-3 top-[16px]"
        onMouseOver={() => setShowSearchOption(true)}>
        {iconMapRecord[basicConfig?.searchEngine] &&
          iconMapRecord[basicConfig.searchEngine]}
      </div>
      <input
        className="h-7 my-1 leading-8 pl-2 outline-none rounded-sm xl:w-[400px] sm:w-[380px] w-[40vw]"
        placeholder="搜索"
        // value={keyword}
        onChange={onChangeKeyword}
        onKeyDown={onSearch}
        onClick={(e) => e.stopPropagation()}
      />
      {showSearchOption && <SearchEngineOption />}
      {}
    </motion.div>
  )
}

export default Search
