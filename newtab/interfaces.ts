export interface IBasicConfig {
  lastUpdateTime?: number
  hadInit?: boolean
  searchEngine: ESearchEngine
  openSearchResultStyle: EOpenNewWindowForSearch
  searchBoxX?: number
  searchBoxY?: number
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

export interface IUseQueryResp<T> {
  data: T
  isLoading: boolean
  isError: boolean
  run: () => void
}
export interface IUseQueryOption<T> {
  onSuccess: (data: T) => void
  onError: (e: any) => void
  auto: boolean
  initValue: T
}

export interface IBingWallpaperStore {
  timestamp: number
  data: IWeekImage[]
}

export interface IWeekImage {
  startdate: string
  fullstartdate: string
  enddate: string
  urlbase: string
  copyright: string
}
export interface IThisWeekData {
  images: IWeekImage[]
}
