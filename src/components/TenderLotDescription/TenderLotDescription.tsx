import React from 'react'
import type { FCC } from 'src/types'

import styles from './TenderLotDescription.module.scss'

interface TenderLotDescriptionProps {
  prop?: any
}

const TenderLotDescription: FCC<TenderLotDescriptionProps> = ({ prop }) => {
  return (
    <div className={styles.container} data-testid='test-TenderLotDescription'>
      {prop}
    </div>
  )
}

TenderLotDescription.displayName = 'TenderLotDescription'

export default TenderLotDescription
