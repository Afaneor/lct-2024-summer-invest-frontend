import { Card, Col, Form, Input, notification, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle, FormItem } from '@/components'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import type { FormErrorsHook } from '@/hooks/useFormErrors'
import { useFormErrors } from '@/hooks/useFormErrors'
import { Meta } from '@/layouts/Meta'
import AuthServices from '@/services/auth/AuthServices'
import { Main } from '@/templates/Main'

const Registration: FCC = () => {
  const { errors, setFormErrors } = useFormErrors() as FormErrorsHook
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const onFinish = (data: any) => {
    setIsLoading(true)
    AuthServices.register(data)
      .then(() => {
        notification.success({
          message:
            'Вам отправлено сообщение на почту для подтверждения регистрации',
          duration: 3,
        })
        router.push('/login')
      })
      .catch((error: { data: Object }) => {
        setFormErrors(error.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }
  const onFinishFailed = () => {
    notification.error({
      message: 'Исправьте введенные данные',
      duration: 3,
    })
  }
  return (
    <Main
      meta={
        <Meta
          title='Регистрация'
          description='Регистрация в системе умного помощника'
        />
      }
    >
      <Row justify='center' style={{ padding: '1% 0' }}>
        <Col xs={24} md={24} lg={12}>
          <Card hoverable>
            <BebasNeueTitle level={1} title='Регистрация' />
            <Form
              layout='vertical'
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <Row justify='space-between' gutter={20}>
                <Col xs={24} md={8}>
                  <FormItem
                    label='Фамилия'
                    name='last_name'
                    errors={errors.secondName}
                    rules={[
                      {
                        required: true,
                        message: 'Пожалуйста, введите фамилию',
                      },
                    ]}
                  >
                    <Input size='large' />
                  </FormItem>
                </Col>
                <Col xs={24} md={8}>
                  <FormItem
                    label='Имя'
                    name='first_name'
                    errors={errors.first_name}
                    rules={[
                      { required: true, message: 'Пожалуйста, введите имя' },
                    ]}
                  >
                    <Input size='large' />
                  </FormItem>
                </Col>
                <Col xs={24} md={8}>
                  <FormItem
                    label='Отчество'
                    name='middle_name'
                    errors={errors.last_name}
                  >
                    <Input size='large' />
                  </FormItem>
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <FormItem
                    label='ИНН организации'
                    name='inn'
                    errors={errors.inn}
                    rules={[
                      { required: true, message: 'Пожалуйста, введите ИНН' },
                    ]}
                  >
                    <Input size='large' />
                  </FormItem>
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <FormItem
                    label='Веб-сайт организации'
                    name='organization_website'
                    wrapperCol={{ span: 24 }}
                    rules={[
                      { type: 'url', message: 'Введите корректный веб-сайт' },
                    ]}
                    errors={errors.organization_website}
                  >
                    <Input placeholder='https://example.com' size='large' />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={12}>
                  <FormItem
                    label='Страна'
                    name='country'
                    errors={errors.country}
                  >
                    <Input size='large' />
                  </FormItem>
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <FormItem label='Город' name='city' errors={errors.city}>
                    <Input size='large' />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={12}>
                  <FormItem
                    label='Должность'
                    name='position'
                    wrapperCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: 'Пожалуйста, введите должность',
                      },
                    ]}
                    errors={errors.position}
                  >
                    <Input size='large' />
                  </FormItem>
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <FormItem
                    label='Электронная почта'
                    name='email'
                    rules={[
                      {
                        type: 'email',
                        message: 'Введите корректный адрес электронной почты',
                      },
                      { required: true, message: 'Пожалуйста, введите email' },
                    ]}
                    errors={errors.email}
                  >
                    <Input placeholder='name@example.ru' size='large' />
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={12}>
                  <FormItem
                    label='Пароль'
                    name='password1'
                    rules={[
                      { required: true, message: 'Пожалуйста, введите пароль' },
                    ]}
                    errors={errors.password}
                    hasFeedback
                  >
                    <Input.Password size='large' />
                  </FormItem>
                </Col>
                <Col xs={24} md={24} lg={12}>
                  <FormItem
                    label='Повторите пароль'
                    name='password2'
                    rules={[
                      { required: true, message: 'Пожалуйста, введите пароль' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password1') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error('Пароли должны совпадать!')
                          )
                        },
                      }),
                    ]}
                    errors={errors.password}
                  >
                    <Input.Password size='large' />
                  </FormItem>
                </Col>
              </Row>
              <Form.Item>
                <ButtonPrimaryRed
                  loading={isLoading}
                  block
                  size='large'
                  htmlType='submit'
                >
                  Зарегистрироваться
                </ButtonPrimaryRed>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </Main>
  )
}

Registration.displayName = 'Registration'

export default Registration
