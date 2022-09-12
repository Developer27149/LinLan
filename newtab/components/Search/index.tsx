import { ChangeEvent, useEffect, useRef, useState } from "react"
import { bingSuggestionApi, request } from "~request"
import { bingSuggestionRecordAtom, searchEngineAtom } from "~stores"

import { FcGoogle } from "react-icons/fc"
import { debounce } from "lodash-es"
import { useAtom } from "jotai"

const iconMapRecord = {
  google: <FcGoogle />
}

function Search() {
  const [searchEngine, setSearchEngine] = useAtom(searchEngineAtom)
  const [bingSuggestion, setBingSuggestion] = useAtom(bingSuggestionRecordAtom)
  const [keyword, setKeyword] = useState("")
  const [suggest, setSuggest] = useState([])

  const getSuggestionFc = useRef(
    debounce(async (query: string, callback?: () => void) => {
      const res = await bingSuggestionApi(query)
      console.log(res)
      callback?.(res)
    }, 1 * 1000)
  )

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
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
      return
    }
    getSuggestionFc.current?.(keyword.trim(), (dataArr: any[]) => {
      setBingSuggestion((record) => ({ ...record, [keyword]: dataArr }))
    })
  }, [keyword])
  return (
    <div className="fixed top-24 left-[50%] -translate-x-[50%] bg-white z-1 rounded-lg p-1">
      <div className="absolute right-3 top-[15px]">
        {iconMapRecord[searchEngine] && iconMapRecord[searchEngine]}
      </div>
      <input
        className="h-8 leading-8 pl-2 outline-none rounded-sm xl:w-[400px] sm:w-[380px] w-[40vw]"
        placeholder="搜索"
        // value={keyword}
        onChange={onChangeKeyword}
      />
    </div>
  )
}

export default Search
