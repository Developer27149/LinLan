import type { IUseQueryOption, IUseQueryResp } from "~newtab/interfaces"

import { useState } from "react"

export default function useQuery<T>(
  asyncFunction: () => Promise<any>,
  option?: IUseQueryOption<T>
): IUseQueryResp<T> {
  const [data, setData] = useState(option?.initValue)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const run = () => {
    asyncFunction()
      .then((res) => {
        setIsLoading(false)
        setData(res)
        option?.onSuccess(res)
      })
      .catch((err) => {
        console.log(err)
        setIsError(true)
        option?.onError(err)
      })
  }
  if (option?.auto) run()

  return { data, isLoading, isError, run }
}
