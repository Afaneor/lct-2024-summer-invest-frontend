import { Card } from 'antd'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import React from 'react'
import type { FCC } from 'src/types'

import TruncateText from '../TruncateText/TruncateText'

interface SupportCardProps {
  title: string
  text: string
  href: string
  style?: CSSProperties
}

const SupportCard: FCC<SupportCardProps> = ({ href, title, text, style }) => {
  return (
    <Card
      hoverable
      title={title}
      style={{ height: '100%', ...style }}
      extra={
        <Link target='_blank' href={href}>
          Подробнее
        </Link>
      }
    >
      <TruncateText text={text} length={150} />
    </Card>
  )
}

SupportCard.displayName = 'SupportCard'

export default SupportCard
