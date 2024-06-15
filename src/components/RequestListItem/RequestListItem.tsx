import {
  DownloadOutlined,
  QuestionCircleOutlined,
  ShopOutlined,
  SolutionOutlined,
} from '@ant-design/icons'
import { Button, List, Space, Tooltip, Typography } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { useDateTimePrettyStr } from '@/hooks/useDateTimePrettyStr'

import styles from './RequestListItem.module.scss'

const { Title } = Typography
interface RequestListItemProps {
  createdAt: string
}

const RequestListItem: FCC<RequestListItemProps> = ({ createdAt }) => {
  const { dateFormatter } = useDateTimePrettyStr()
  return (
    <List.Item className={styles.container}>
      <Space align='center' direction='horizontal'>
        <Title level={5}>Запрос на поиск объектов для инвестирования от</Title>
        <Title level={5}>{dateFormatter({ date: createdAt })}</Title>
      </Space>
      <Space>
        <Tooltip title='Подобранные объекты'>
          <Button icon={<ShopOutlined />} />
        </Tooltip>
        <Tooltip title='Меры поддержки'>
          <Button icon={<SolutionOutlined />} />
        </Tooltip>
        <Tooltip title='Часто возникающие проблемы'>
          <Button icon={<QuestionCircleOutlined />} />
        </Tooltip>
        <Tooltip title='Скачать отчет'>
          <Button icon={<DownloadOutlined />} />
        </Tooltip>
      </Space>
    </List.Item>
  )
}

RequestListItem.displayName = 'RequestListItem'

export default RequestListItem
