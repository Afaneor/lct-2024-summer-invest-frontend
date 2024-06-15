import { List, notification } from 'antd'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

import type { EntityKeyEnum } from '@/chat/models/Message'
import { ChatContext } from '@/components/ChatContextProvider/ChatContextProvider'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { Links } from '@/components/Header/Links'
import { RequestListItem } from '@/components/RequestListItem'
import { useFileDownload } from '@/hooks/useFileDownload'
import { useFilter } from '@/hooks/useFilter'
import type { SelectionRequestActualProps } from '@/models/SelectionRequest'
import { SelectionRequestModel } from '@/models/SelectionRequest'
import withAuth from '@/pages/HOC'
import MyProfileLayout from '@/templates/MyProfileLayout'
import type { ModelOptionProps } from '@/types'

const Model = SelectionRequestModel
const Requests = () => {
  const router = useRouter()

  const [requestFilter] = useFilter()
  const { setNewFilter } = useContext(ChatContext)
  const { fileDownload } = useFileDownload()
  const [isLoadingObj, setIsLoadingObj] = React.useState<
    Record<string, boolean>
  >({})

  const handleGoShow = (
    key: keyof typeof EntityKeyEnum,
    filterObj: Record<string, any> | any,
    link: string
  ) => {
    setNewFilter({ [key]: filterObj })
    router.push(link)
  }

  const handleDownloadFile = (id: string | number) => {
    setIsLoadingObj({ ...isLoadingObj, [id]: true })
    fileDownload({
      url: Model.downloadReportUrl(id),
      name: 'Заявка на подбор',
    })
      .then(() => {
        notification.success({
          message: 'Файл успешно скачан',
        })
      })
      .catch(() => {
        notification.error({
          message: 'Ошибка при скачивании файла',
        })
      })
      .finally(() => {
        setIsLoadingObj({ ...isLoadingObj, [id]: false })
      })
  }

  return (
    <MyProfileLayout>
      <FetchMoreItemsComponent
        model={Model}
        defFilters={requestFilter}
        renderItems={({ data }) => (
          <List
            bordered
            itemLayout='horizontal'
            // убираем из списка заявки, в которых нет фильтра бота
            dataSource={data?.filter((item) => item.bot_filter.value)}
            renderItem={(
              item: ModelOptionProps<SelectionRequestActualProps>
            ) => (
              <RequestListItem
                isLoadingDownloadReport={isLoadingObj[item.id.value]}
                hasSupportFilter={!!item.bot_filter?.value?.service_support}
                hasFAQFilter={!!item.bot_filter?.value?.category_problem}
                hasInvestmentObjectsFilter={
                  !!item.bot_filter?.value?.investment_object
                }
                createdAt={item.created_at.value}
                onShowInvestmentObjects={() =>
                  handleGoShow(
                    'investment_object',
                    item.bot_filter?.value?.investment_object,
                    `${Links.SMART_ASSISTANT.href}`
                  )
                }
                onDownloadReport={() => handleDownloadFile(item.id.value)}
                onShowSupport={() =>
                  handleGoShow(
                    'service_support',
                    item.bot_filter?.value?.service_support,
                    `${Links.SUPPORTS.href}`
                  )
                }
                onShowFAQ={() =>
                  handleGoShow(
                    'category_problem',
                    item.bot_filter?.value?.category_problem,
                    `${Links.FAQ.href}`
                  )
                }
              />
            )}
          />
        )}
      />
    </MyProfileLayout>
  )
}

export default withAuth(Requests)
