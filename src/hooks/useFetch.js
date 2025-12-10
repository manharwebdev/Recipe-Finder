import { useState, useEffect } from 'react'

export default function useFetch(asyncFn, deps = [], immediate = true){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const execute = async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const result = await asyncFn(...args)
      setData(result)
      setLoading(false)
      return result
    } catch (err) {
      setError(err)
      setLoading(false)
      throw err
    }
  }

  useEffect(() => {
    if(immediate){
      execute()
    }
    // eslint-disable-next-line
  }, deps)

  return { data, loading, error, execute, setData }
}
