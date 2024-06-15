import '../styles/global.css'
import '../styles/fonts.css'
import 'antd/dist/reset.css'
import '../../public/antd.min.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/lib/locale/ru_RU'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import React from 'react'

import ChatContextProvider from '@/components/ChatContextProvider/ChatContextProvider'
import CurrentUserProvider from '@/components/CurrentUserProvider/CurrentUserProvider'
import Metrika from '@/components/Metrika/Metrika'
import NotificationMessageProvider from '@/components/NotificationMessage/NotificationMessage'

const qClientConfig = {
  defaultOptions: {},
}

const queryClient = new QueryClient(qClientConfig)
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider locale={ruRU}>
      <QueryClientProvider client={queryClient}>
        <NotificationMessageProvider>
          <CurrentUserProvider>
            <ChatContextProvider>
              <Metrika />
              <Component {...pageProps} />
            </ChatContextProvider>
          </CurrentUserProvider>
        </NotificationMessageProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default appWithTranslation(MyApp)
