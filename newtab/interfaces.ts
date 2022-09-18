export interface IBasicConfig {
  lastUpdateTime?: number
  hadInit?: boolean
  searchEngine: ESearchEngine
  openSearchResultStyle: EOpenNewWindowForSearch
  searchBoxX?: string
  searchBoxY?: string
}

export enum EArea {
  local = "local",
  sync = "sync"
}

export enum ESearchEngine {
  google = "google",
  bing = "bing",
  zhihu = "zhihu",
  baidu = "baidu"
}

export enum EOpenNewWindowForSearch {
  _blank = "_blank",
  _self = "_self"
}
