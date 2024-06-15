import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Row,
} from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle, FormItem } from '@/components'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import { type FormErrorsHook, useFormErrors } from '@/hooks/useFormErrors'
import type { LoginValuesTypes } from '@/services/auth'
import { useLogin } from '@/services/auth/hooks'

import styles from './AuthModalComponent.module.scss'

interface AuthModalComponentProps {
  open: boolean
  onCLose: () => void
}

const AuthModalComponent: FCC<AuthModalComponentProps> = ({
  open,
  onCLose,
}) => {
  const [loginForm] = Form.useForm()
  const { errors, setFormErrors } = useFormErrors() as FormErrorsHook
  const router = useRouter()

  const { mutate: login, isLoading: loginIsLoading }: any = useLogin()
  const handleLogin = (credentials: LoginValuesTypes) => {
    login(credentials, {
      onSuccess: () => {
        router.push('/calculator')
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
    <Modal open={open} footer={null} onCancel={onCLose}>
      <Row justify='center'>
        <Col>
          <BebasNeueTitle title='Вход' />
        </Col>
        <Col span={24}>Возможности для зарегистрированных пользователей:</Col>
        <Col span={24}>
          <ul className={styles.list}>
            <li>Сохранение расчетов</li>
            <li>Просмотр истории расчетов</li>
            <li>Создание шаблонов расчетов</li>
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
    </Modal>
  )
}

AuthModalComponent.displayName = 'AuthModalComponent'

export default AuthModalComponent
