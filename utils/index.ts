export const getItemByKeyFromStorage = async (key: string) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (data, err) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const setDataIntoStorage = async (data: Record<string, any>) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set(data, (data, err) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const sleepDelay = async (s = 3) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000))
