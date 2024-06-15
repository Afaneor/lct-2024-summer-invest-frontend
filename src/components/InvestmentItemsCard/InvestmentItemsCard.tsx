import { Card } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'

interface InvestmentItemsCardProps {
  title: string
  preview_image: string
  hoverable?: boolean
}

export const InvestmentItemsCard: FCC<InvestmentItemsCardProps> = ({
  title,
  preview_image,
  hoverable,
  ...rest
}: any) => (
  <Card
    hoverable={hoverable}
    cover={<img style={{ height: 300 }} alt={title} src={preview_image} />}
    {...rest}
  >
    <BebasNeueTitle title={title} ellipsis level={3} />
  </Card>
)

InvestmentItemsCard.displayName = 'InvestmentItemsCard'
