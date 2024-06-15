import { Card, Tag, Tooltip } from 'antd'
import Link from 'next/link'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'
import { CompareButton } from '@/components/CompareButton'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'

interface InvestmentItemsCardProps {
  href: string
  title: string
  preview_image: string
  hoverable?: boolean
  id: string | number
  transaction_form?: string
  object_type?: string
  coast?: string
}

export const InvestmentItemsCard: FCC<InvestmentItemsCardProps> = ({
  id,
  title,
  preview_image,
  hoverable,
  href,
  object_type,
  transaction_form,
  coast,
  ...rest
}: any) => {
  return (
    <Link target='_blank' href={href}>
      <Card
        hoverable={hoverable}
        cover={<img style={{ height: 300 }} alt={title} src={preview_image} />}
        {...rest}
        actions={[
          <Tooltip key='compare' title='Сравнит'>
            <CompareButton
              entityType={InvestmentObjectsModel.modelName}
              itemId={id}
            />
          </Tooltip>,
        ]}
      >
        <BebasNeueTitle title={title} ellipsis level={3} />
        {transaction_form ? <Tag>{transaction_form}</Tag> : null}
        {object_type ? <Tag>{object_type}</Tag> : null}
        {coast ? <Tag>{coast}</Tag> : null}
      </Card>
    </Link>
  )
}

InvestmentItemsCard.displayName = 'InvestmentItemsCard'
