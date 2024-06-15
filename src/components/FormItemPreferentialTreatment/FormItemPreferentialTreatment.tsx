import React from 'react'
import type { FCC } from 'src/types'

import styles from './FormItemPreferentialTreatment.module.scss'

interface FormItemPreferentialTreatmentProps {
  prop?: any
}

const FormItemPreferentialTreatment: FCC<
  FormItemPreferentialTreatmentProps
> = ({ prop }) => {
  return (
    <div
      className={styles.container}
      data-testid='test-FormItemPreferentialTreatment'
    >
      {prop}FormItemPreferentialTreatment
    </div>
  )
}

FormItemPreferentialTreatment.displayName = 'FormItemPreferentialTreatment'

export default FormItemPreferentialTreatment
