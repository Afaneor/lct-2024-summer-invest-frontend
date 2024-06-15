import { Col, Row, Space, Spin } from 'antd'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { Markdown } from 'src/chat/components/Markdown'
import { useDateTimePrettyStr } from 'src/chat/hooks/useDateTimePrettyStr'
import type { FCC } from 'src/types'

import type { MessageModelProps } from '@/chat/models/Message'
import { OwnerTypeEnum } from '@/chat/models/Message'
import { WhoOwnerType } from '@/chat/types'

import styles from './style.module.scss'

interface MessageProps extends MessageModelProps {
  id: number | string
  text: string
  datetime?: string
  isLoading?: boolean
}

const who: Record<string, string> = {
  [OwnerTypeEnum.BOT]: WhoOwnerType.BOT,
  [OwnerTypeEnum.USER]: WhoOwnerType.USER,
}

export const Message: FCC<MessageProps> = ({
  text,
  created_at,
  owner_type,
  isLoading,
}) => {
  const { dateFormatter } = useDateTimePrettyStr()
  const currentJustify = useMemo(
    () => (owner_type === OwnerTypeEnum.USER ? 'end' : 'start'),
    [owner_type]
  )
  return (
    <Row className={styles.row}>
      <Col span={24}>
        <Row justify={currentJustify}>
          <Col
            className={clsx(
              styles.container,
              owner_type === OwnerTypeEnum.USER && styles.user,
              owner_type === OwnerTypeEnum.BOT && styles.bot
            )}
          >
            <Space direction='horizontal' align='baseline'>
              {isLoading ? <Spin size='small' /> : null}
              <Markdown content={text} />
            </Space>
          </Col>
          <Col span={24}>
            <Row justify={currentJustify}>
              <h5 className={styles.whoAndDate}>
                {who[owner_type]}
                {created_at ? `, ${dateFormatter({ date: created_at })}` : null}
              </h5>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Message.displayName = 'Message'

export default Message
