import { Button } from 'antd'
import type { ButtonProps } from 'antd/es/button/button'
import clsx from 'clsx'
import React from 'react'
import type { FCC } from 'src/types'

import styles from './ButtonRounded.module.scss'

interface ButtonRoundedProps extends ButtonProps {
  onClick?: () => void
}

const ButtonRounded: FCC<ButtonRoundedProps> = ({ children, ...rest }) => {
  return (
    <Button
      className={clsx(
        styles.container,
        rest.className,
        rest?.disabled && styles.disabled
      )}
      {...rest}
    >
      {children}
    </Button>
  )
}

ButtonRounded.displayName = 'ButtonRounded'

export default ButtonRounded
