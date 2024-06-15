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
const nodataText = 'Данные находятся в обработке. Ожидайте...'
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
        <Tooltip
          title={
            hasInvestmentObjectsFilter
              ? 'Посмотреть подобранные объекты'
              : nodataText
          }
        >
          <Button
            type='text'
            shape='circle'
            disabled={!hasInvestmentObjectsFilter}
            icon={<ShopOutlined />}
            onClick={onShowInvestmentObjects}
          />
        </Tooltip>
        <Tooltip
          title={hasSupportFilter ? 'Посмотреть меры поддержки' : nodataText}
        >
          <Button
            type='text'
            shape='circle'
            disabled={!hasSupportFilter}
            icon={<SolutionOutlined />}
            onClick={onShowSupport}
          />
        </Tooltip>
        <Tooltip
          title={hasFAQFilter ? 'Часто возникающие вопросы' : nodataText}
        >
          <Button
            type='text'
            shape='circle'
            disabled={!hasFAQFilter}
            icon={<QuestionCircleOutlined />}
            onClick={onShowFAQ}
          />
        </Tooltip>
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
