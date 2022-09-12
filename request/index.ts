export const request = {
  get: async function <T>(url: string, headers = {}): Promise<T> {
    try {
      const res = await fetch(url, {
        headers
      })
      return res.json()
    } catch (error) {
      console.log("error at get request:", error)
    }
  },
  post: async function <T>(url: string, data: Record<string, any>): Promise<T> {
    try {
      const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      return res.json()
    } catch (error) {
      console.log("fetch post request error:", error)
    }
  }
}

export const bingSuggestionApi = async (query: string) => {
  try {
    const subscriptionKey = process.env.PLASMO_PUBLIC_BING_SEARCH_KEY
    const searchSuggestApiUrl = `http://api.bing.com/qsonhs.aspx?type=cb&q=${query}&cb=window.bing.sug`

    const response = await fetch(searchSuggestApiUrl, {
      "Ocp-Apim-Subscription-Key": subscriptionKey
    })
    const resString = await response.text()
    const regInstance = /\"Results":\[\{.*\}\]/
    const matchRecord = resString.match(regInstance)

    const matchString = matchRecord[0]
    const results = JSON.parse(`{${matchString}}`)?.Results
    return results.map(i => i.Suggests).flat().map(i => i.Txt)
  } catch (error) {
    console.log("get bing suggestion fail:", error)
    return []
  }
}
