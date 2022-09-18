import { EArea } from "~newtab/interfaces"

export const getItemByKeyFromStorage = async (
  key: string,
  area?: EArea = EArea.local
) => {
  return new Promise((resolve, reject) => {
    chrome.storage[area].get(key, (data, err) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const setDataIntoStorage = async (
  data: Record<string, any>,
  area?: EArea = EArea.local
) => {
  return new Promise((resolve, reject) => {
    chrome.storage[area].set(data, (data, err) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const sleepDelay = async (s = 3) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000))
