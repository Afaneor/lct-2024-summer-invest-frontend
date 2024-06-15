import { Button, Card } from 'antd'
import React, { useState } from 'react'
import type { FCC } from 'src/types'

import { Markdown } from '@/chat/components/Markdown'
import { useDateTimePrettyStr } from '@/chat/hooks/useDateTimePrettyStr'

const { Meta: CardMeta } = Card

interface EventCardProps {
  date: string
  name: string
  description: string
  photo?: string | null
}

const EventCard: FCC<EventCardProps> = ({ date, name, description, photo }) => {
  const { dateFormatter } = useDateTimePrettyStr()
  const [isTruncated, setIsTruncated] = useState(true)
  const replaceNewLine = (text: string) => text.replace(/\\n/g, '\n')

  const truncatedText = isTruncated
    ? `${replaceNewLine(description?.slice(0, 100))}...`
    : replaceNewLine(description)
  const toggleTruncated = () => {
    setIsTruncated(!isTruncated)
  }
  return (
    <Card
      style={{
        height: '100%',
      }}
      title={dateFormatter({
        date,
      })}
      hoverable
      cover={
        <img alt={name} key={name} src={photo || 'https://picsum.photos/700'} />
      }
    >
      <CardMeta
        title={name}
        description={<Markdown content={truncatedText} />}
      />
      <Button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleTruncated()
        }}
      >
        {isTruncated ? 'Еще' : 'Скрыть'}
      </Button>
    </Card>
  )
}

EventCard.displayName = 'EventCard'

export default EventCard
