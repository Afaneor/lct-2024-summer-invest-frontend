import { useEffect, useMemo, useState } from 'react'

export const usePrepareInvestData = (data: Record<string, any>) => {
  const [investData, setInvestData] = useState({})

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { tender_lot, real_estate, specialized_site, ready_business } = data
      if (tender_lot || real_estate || specialized_site || ready_business) {
        setInvestData(
          tender_lot || real_estate || specialized_site || ready_business
        )
      }
    }
  }, [data])

  return useMemo(() => ({ ...data, investData }), [data, investData])
}
