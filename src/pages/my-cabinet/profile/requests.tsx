import { List } from 'antd'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'

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

const invesFakeFilter = {
  economic_activity_name: ['Пункты выдачи заказов'],
  // transaction_form_type: ['Продажа'],
  // specialized_site_is_free_customs_zone_regime: 'Нет',
}

const supportsFakeFilter = {
  support_type: ['Консультационная поддержка'],
  support_level: ['Региональные меры'],
  msp_roster: 'Нет',
}

const faqFakeFilter = {
  search: 'предприятие',
}

const Model = SelectionRequestModel
const Requests = () => {
  const router = useRouter()

  const [requestFilter] = useFilter()
  const { setNewFilter } = useContext(ChatContext)
  const { fileDownload, isLoading } = useFileDownload()

  const handleGoShow = (filterObj: Record<string, any>, link: string) => {
    setNewFilter(filterObj)
    router.push(link)
  }

  const handleDownloadFile = (id: string | number) => {
    fileDownload({
      url: Model.downloadReportUrl(id),
      name: 'Заявка на подбор',
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
            dataSource={data}
            renderItem={(
              item: ModelOptionProps<SelectionRequestActualProps>
            ) => (
              <RequestListItem
                isLoadingDownloadReport={isLoading}
                createdAt={item.created_at.value}
                onShowInvestmentObjects={() =>
                  handleGoShow(invesFakeFilter, `${Links.SMART_ASSISTANT.href}`)
                }
                onDownloadReport={() => handleDownloadFile(item.id.value)}
                onShowSupport={() =>
                  handleGoShow(supportsFakeFilter, `${Links.SUPPORTS.href}`)
                }
                onShowFAQ={() =>
                  handleGoShow(faqFakeFilter, `${Links.FAQ.href}`)
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
