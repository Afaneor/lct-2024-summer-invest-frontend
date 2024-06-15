import { Typography } from 'antd'
import type { TitleProps } from 'antd/es/typography/Title'
import clsx from 'clsx'
import React from 'react'
import type { FCC } from 'src/types'

import styles from './BebasNeueTitle.module.scss'

const { Title } = Typography
interface BebasNeueTitleProps extends TitleProps {
  title: string
  style?: React.CSSProperties
}

const BebasNeueTitle: FCC<BebasNeueTitleProps> = ({
  title,
  style,
  className,
  ...rest
}) => {
  return (
    <Title
      {...rest}
      style={style}
      className={clsx(styles.titleStyle, className)}
    >
      {title}
    </Title>
  )
}

BebasNeueTitle.displayName = 'BebasNeueTitle'

export default BebasNeueTitle
