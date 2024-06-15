import { useEffect, useState } from 'react'

/**
 * Из строки pathname делает массив строк, где каждый элемент - часть пути
 * @param pathname
 */
function useSplitPathname(pathname: string) {
  const [result, setResult] = useState(['/'])
  let tempPathname = pathname
  useEffect(() => {
    if (pathname.startsWith('/')) {
      tempPathname = pathname.substring(1)
    }

    const parts = tempPathname.split('/')
    const newResult = parts.map((part) => `/${part}`)

    setResult(newResult)
  }, [pathname])

  return result
}

export default useSplitPathname
