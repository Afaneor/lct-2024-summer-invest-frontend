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
  hasInvestmentObjectsFilter: boolean
  hasSupportFilter: boolean
  hasFAQFilter: boolean
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
  hasInvestmentObjectsFilter,
  hasSupportFilter,
  hasFAQFilter,
}) => {
  const { dateFormatter } = useDateTimePrettyStr()
  return (
    <List.Item className={styles.container}>
      <Space align='center' direction='horizontal'>
        <Title level={5}>Запрос на поиск объектов для инвестирования от</Title>
        <Title level={5}>{dateFormatter({ date: createdAt })}</Title>
      </Space>
      <Space>
        {hasInvestmentObjectsFilter ? (
          <Tooltip title='Посмотреть подобранные объекты'>
            <Button
              type='text'
              shape='circle'
              icon={<ShopOutlined />}
              onClick={onShowInvestmentObjects}
            />
          </Tooltip>
        ) : null}
        {hasSupportFilter ? (
          <Tooltip title='Посмотреть меры поддержки'>
            <Button
              type='text'
              shape='circle'
              icon={<SolutionOutlined />}
              onClick={onShowSupport}
            />
          </Tooltip>
        ) : null}
        {hasFAQFilter ? (
          <Tooltip title='Вопросы и ответы'>
            <Button
              type='text'
              shape='circle'
              icon={<QuestionCircleOutlined />}
              onClick={onShowFAQ}
            />
          </Tooltip>
        ) : null}
        {hasInvestmentObjectsFilter ? (
          <Tooltip title='Скачать отчет'>
            <Button
              type='text'
              shape='circle'
              loading={isLoadingDownloadReport}
              icon={<DownloadOutlined />}
              onClick={onDownloadReport}
            />
          </Tooltip>
        ) : null}
      </Space>
    </List.Item>
  )
}

RequestListItem.displayName = 'RequestListItem'

export default RequestListItem
