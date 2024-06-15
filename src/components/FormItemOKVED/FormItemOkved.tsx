import React from 'react'
import type { FCC } from 'src/types'

import styles from './FormItemOkved.module.scss'

interface FormItemOKVEDProps {
  prop?: any
}

const FormItemOkved: FCC<FormItemOKVEDProps> = ({ prop }) => {
  return (
    <div className={styles.container} data-testid='test-FormItemOKVED'>
      {prop}
    </div>
  )
}

FormItemOkved.displayName = 'FormItemOkved'

export default FormItemOkved
