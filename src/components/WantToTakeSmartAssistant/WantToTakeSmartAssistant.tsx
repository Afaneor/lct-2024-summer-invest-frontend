import { MessageOutlined } from '@ant-design/icons'
import { Alert, Col, Row } from 'antd'
import React, { useContext } from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import { ChatContext } from '@/components/ChatContextProvider/ChatContextProvider'

const WantToTakeSmartAssistant: FCC = () => {
  const { setIsOpen, isOpen } = useContext(ChatContext)
  return (
    <Row>
      <Col span={24}>
        <Alert
          message={
            <BebasNeueTitle
              title='Воспользуйтесь поиском или задайте вопрос умному помощнику'
              style={{
                marginBottom: 0,
              }}
              level={3}
            />
          }
          type='error'
          action={
            <ButtonPrimaryRed
              size='large'
              icon={<MessageOutlined />}
              onClick={() => setIsOpen(!isOpen)}
            >
              Задать вопрос
            </ButtonPrimaryRed>
          }
        />
      </Col>
    </Row>
  )
}

WantToTakeSmartAssistant.displayName = 'WantToTakeSmartAssistant'

export default WantToTakeSmartAssistant
