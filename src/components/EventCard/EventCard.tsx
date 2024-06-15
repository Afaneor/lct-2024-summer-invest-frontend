import { Button, Card } from 'antd'
import React, { useState } from 'react'
import type { FCC } from 'src/types'

import { Markdown } from '@/chat/components/Markdown'
import { useDateTimePrettyStr } from '@/chat/hooks/useDateTimePrettyStr'

const { Meta: CardMeta } = Card

function getRandomImage(): string {
  // Функция для генерации случайного пути к изображению
  // если изображение не передано
  const randomNumber = Math.floor(Math.random() * 5) + 1 // Генерируем случайное число от 1 до 5
  return `/images/${randomNumber}.png` // Возвращаем путь к изображению с этим номером
}
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
      cover={<img alt={name} key={name} src={photo || getRandomImage()} />}
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
