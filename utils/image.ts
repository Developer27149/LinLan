export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.readAsDataURL(blob)
  })
}

export const getWallpaperBase64FromUrl = async (url: string) => {
  try {
    const res = await fetch(url)
    const reader = res?.body?.getReader()
    let receivedLength = 0
    const chunks = []
    while (reader) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      chunks.push(value)
    }
    const blob = new Blob(chunks as BlobPart[])
    return blobToBase64(blob)
  } catch (error) {
    console.log("下载失败：", error)
  }
}

const handleDownloadCurWallpaper = (url: string) => {
  chrome.downloads.download({
    url,
    filename: `岚-${~~(Math.random() * 10000)}.jpeg`
  })
}

export const shouldFetchNewData = (timestamp: number) =>
  new Date().toLocaleDateString() !== new Date(timestamp).toLocaleDateString()
