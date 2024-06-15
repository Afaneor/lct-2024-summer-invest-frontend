import { Button } from 'antd'
import type { ButtonProps } from 'antd/es/button/button'
import clsx from 'clsx'
import React from 'react'
import type { FCC } from 'src/types'

import styles from './ButtonPrimaryRed.module.scss'

interface ButtonPrimaryRedProps extends ButtonProps {
  children?: React.ReactNode
}

const ButtonPrimaryRed: FCC<ButtonPrimaryRedProps> = ({
  children,
  ...rest
}) => {
  return (
    <Button
      type='primary'
      className={clsx(
        styles.buttonPrimaryRed,
        rest?.disabled && styles.disabled
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}

ButtonPrimaryRed.displayName = 'ButtonPrimaryRed'

export default ButtonPrimaryRed
