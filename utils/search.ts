import { ESearchEngine } from "~newtab/interfaces"

export const generateSearchUrl = (
  targetEngine: ESearchEngine,
  keyword: string
) => {
  const recordMap = {
    [ESearchEngine.google]: `https://www.google.com/search?q=${keyword}`,
    [ESearchEngine.bing]: `https://www.bing.com/search?q=${keyword}`,
    [ESearchEngine.zhihu]: `https://www.zhihu.com/search?q=${keyword}&type=content`,
    [ESearchEngine.baidu]: `https://www.baidu.com/s?wd=${keyword}`
  }
  return recordMap[targetEngine]
}
