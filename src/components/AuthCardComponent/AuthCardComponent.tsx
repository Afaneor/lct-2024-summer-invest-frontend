import { Checkbox, Col, Divider, Form, Input, notification, Row } from 'antd'
import Link from 'next/link'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle, FormItem } from '@/components'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import { Links } from '@/components/Header/Links'
import { type FormErrorsHook, useFormErrors } from '@/hooks/useFormErrors'
import type { LoginValuesTypes } from '@/services/auth'
import { useLogin } from '@/services/auth/hooks'

import styles from './AuthCardComponent.module.scss'

const AuthCardComponent: FCC = () => {
  const [loginForm] = Form.useForm()
  const { errors, setFormErrors } = useFormErrors() as FormErrorsHook

  const { mutate: login, isLoading: loginIsLoading }: any = useLogin()
  const handleLogin = (credentials: LoginValuesTypes) => {
    login(credentials, {
      onSuccess: (
        data: Record<'data', Record<'is_need_add_info', boolean>>
      ) => {
        if (data.data.is_need_add_info) {
          // если пользователь не заполнил о бизнесе данные,
          // то переходим на страницу заполнения
          window.location.href = `${Links.MY_CABINET.href}${Links.PROFILE.href}${Links.BUSINESS.href}/`
        } else if (window.location.pathname.includes('login')) {
          window.location.href = '/'
        } else {
          window.location.reload()
        }
      },
      onError: (error: any) => {
        setFormErrors(error?.data)
        if (error?.data?.detail) {
          notification.error({
            message: error.data.detail,
          })
        }
      },
    })
  }
  const onFinishFailed = () => {
    //
  }
  return (
    <>
      <Row justify='center'>
        <Col>
          <BebasNeueTitle title='Вход' />
        </Col>
        <Col span={24}>Возможности для зарегистрированных пользователей:</Col>
        <Col span={24}>
          <ul className={styles.list}>
            <li>Индивидуальный подбор объектов</li>
            <li>Сохранение запросов</li>
            <li>Сравнение объектов</li>
          </ul>
        </Col>
      </Row>
      <Divider />
      <Form
        form={loginForm}
        name='basic'
        layout='vertical'
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <FormItem
          label='Электронная почта'
          name='email'
          rules={[
            {
              type: 'email',
              message: 'Введите корректный адрес электронной почты',
            },
          ]}
          errors={errors.email}
        >
          <Input placeholder='name@example.ru' size='large' />
        </FormItem>

        <FormItem
          label='Пароль'
          name='password'
          rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
          errors={errors.password}
        >
          <Input.Password placeholder='Введите ваш пароль' size='large' />
        </FormItem>

        <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 0, span: 16 }}
        >
          <Checkbox>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item>
          <ButtonPrimaryRed
            loading={loginIsLoading}
            block
            size='large'
            htmlType='submit'
          >
            Войти
          </ButtonPrimaryRed>
        </Form.Item>
      </Form>
      <Row justify='center'>
        <Col>
          <Link href='/registration'>Еще не зарегистрированы?</Link>
        </Col>
      </Row>
    </>
  )
}

AuthCardComponent.displayName = 'AuthCardComponent'

export default AuthCardComponent
