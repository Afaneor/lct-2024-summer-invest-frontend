import { Button } from 'antd'
import type { BaseButtonProps } from 'antd/es/button/button'
import clsx from 'clsx'
import React from 'react'
import type { FCC } from 'src/types'

import styles from './ButtonRounded.module.scss'

interface ButtonRoundedProps extends BaseButtonProps {
  onClick?: () => void
}

const ButtonRounded: FCC<ButtonRoundedProps> = ({ children, ...rest }) => {
  return (
    <Button className={clsx(styles.container, rest.className)} {...rest}>
      {children}
    </Button>
  )
}

ButtonRounded.displayName = 'ButtonRounded'

export default ButtonRounded
