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
  onShowInvestmentObjects: () => void
  onShowSupport: () => void
  onShowFAQ: () => void
  onDownloadReport: () => void
  isLoadingDownloadReport?: boolean
}

const RequestListItem: FCC<RequestListItemProps> = ({
  createdAt,
  onDownloadReport,
  onShowInvestmentObjects,
  onShowFAQ,
  onShowSupport,
  isLoadingDownloadReport,
}) => {
  const { dateFormatter } = useDateTimePrettyStr()
  return (
    <List.Item className={styles.container}>
      <Space align='center' direction='horizontal'>
        <Title level={5}>Запрос на поиск объектов для инвестирования от</Title>
        <Title level={5}>{dateFormatter({ date: createdAt })}</Title>
      </Space>
      <Space>
        <Tooltip title='Посмотреть подобранные объекты'>
          <Button icon={<ShopOutlined />} onClick={onShowInvestmentObjects} />
        </Tooltip>
        <Tooltip title='Посмотреть меры поддержки'>
          <Button icon={<SolutionOutlined />} onClick={onShowSupport} />
        </Tooltip>
        <Tooltip title='Часто возникающие проблемы'>
          <Button icon={<QuestionCircleOutlined />} onClick={onShowFAQ} />
        </Tooltip>
        <Tooltip title='Скачать отчет'>
          <Button
            loading={isLoadingDownloadReport}
            icon={<DownloadOutlined />}
            onClick={onDownloadReport}
          />
        </Tooltip>
      </Space>
    </List.Item>
  )
}

RequestListItem.displayName = 'RequestListItem'

export default RequestListItem
