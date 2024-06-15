import { Card } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { useDateTimePrettyStr } from '@/chat/hooks/useDateTimePrettyStr'
import { TruncateText } from '@/components/TruncateText'

const { Meta: CardMete } = Card

interface EventCardProps {
  date: string
  name: string
  description: string
  photo?: string | null
}

const EventCard: FCC<EventCardProps> = ({ date, name, description, photo }) => {
  const { dateFormatter } = useDateTimePrettyStr()

  return (
    <Card
      style={{
        height: '100%',
      }}
      title={dateFormatter({
        date,
      })}
      hoverable
      cover={<img alt={name} src={photo || 'https://picsum.photos/200'} />}
    >
      <CardMete
        title={name}
        description={<TruncateText text={description} length={100} />}
      />
    </Card>
  )
}

EventCard.displayName = 'EventCard'

export default EventCard
