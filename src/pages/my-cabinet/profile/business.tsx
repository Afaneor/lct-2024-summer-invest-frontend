import { Col, Form, notification, Row } from 'antd'
import React from 'react'

import { BebasNeueTitle } from '@/components'
import { AddBusinessBiInn } from '@/components/AddBusinessBiInn'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { MyBusinessDescription } from '@/components/MyBusinessDescription'
import { PageCardContainer } from '@/components/PageCardContainer'
import { useApiOptions } from '@/hooks/useApiOptions'
import type { FormErrorObj, FormErrorsHook } from '@/hooks/useFormErrors'
import { useFormErrors } from '@/hooks/useFormErrors'
import { useRefetchInvalidateQuery } from '@/hooks/useRefetchInvalidateQuery'
import { BusinessModel } from '@/models/Business'
import withAuth from '@/pages/HOC'
import { useDeleteItem, usePostExtraActions } from '@/services/base/hooks'
import MyProfileLayout from '@/templates/MyProfileLayout'

const mapping = [
  'full_business_name',
  'position',
  'management_name',
  'inn',
  'email',
  'phone',
  'site',
  'address',
  'okved',
  'type_business',
  'region',
  'city_area',
  'city_district',
  'territorial_location',
  'sector',
  'sub_sector',
]

const blockStyle = {
  margin: '0 0 20px 0',
}

const Model = BusinessModel
const MyProfileBusiness = () => {
  const { refetch } = useRefetchInvalidateQuery()

  const {
    errors,
    setFormErrors,
  }: {
    errors: FormErrorObj
    setFormErrors: any
  } = useFormErrors() as FormErrorsHook
  const [form] = Form.useForm()

  const { mutate: createByInn, isLoading } = usePostExtraActions(
    'createByInn',
    Model.createBusinessByInnUrl()
  )
  const handleCreateByInn = ({ inn }: Record<'inn', string>) => {
    createByInn(
      { inn },
      {
        onSuccess: () => {
          notification.success({
            message: 'Организация успешно добавлена',
          })
          form.resetFields()
          refetch('businessesInfinity')
        },
        onError: (err: any) => {
          if (err?.response?.data?.detail) {
            notification.error({
              message: err.response.data.detail,
            })
          } else {
            setFormErrors(err.response.data)
          }
        },
      }
    )
  }
  const handleUpdateByInn = ({ inn }: Record<'inn', string>) => {
    createByInn(
      { inn },
      {
        onSuccess: () => {
          notification.success({
            message: 'Организация успешно обновлена',
          })
          form.resetFields()
          refetch('businessesInfinity')
        },
        onError: (err: any) => {
          if (err?.response?.data?.detail) {
            notification.error({
              message: err.response.data.detail,
            })
          } else {
            setFormErrors(err.response.data)
          }
        },
      }
    )
  }

  const {
    mutate: deleteItem,
    isLoading: isDeleteItem,
  }: {
    mutate: any
    isLoading: boolean
  } = useDeleteItem(Model)

  const handleDelete = (id: string) => {
    deleteItem(id, {
      onSuccess: () => {
        notification.success({
          message: 'Организация успешно удалена',
        })
        refetch('businessesInfinity')
      },
      onError: (err: any) => {
        notification.error({
          message: err.response.data.detail,
        })
      },
    })
  }
  const { mergeOptionsIntoData } = useApiOptions(Model.modelName, mapping)
  return (
    <MyProfileLayout>
      <FetchMoreItemsComponent
        model={Model}
        lengthPostfixPlural='организаций'
        renderItems={(fetchedValues) => (
          <>
            <Row style={blockStyle}>
              <Col span={24}>
                <AddBusinessBiInn
                  form={form}
                  errors={errors}
                  isLoading={isLoading}
                  onAddByInn={handleCreateByInn}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <BebasNeueTitle title='Ваши организации' level={2} />
              </Col>
            </Row>
            <Row gutter={[20, 20]}>
              {fetchedValues.map((item: any) => {
                const prepItem = mergeOptionsIntoData(item)
                return (
                  <Col key={item.id} span={24}>
                    <PageCardContainer
                      isEditable
                      isLoading={isDeleteItem}
                      onRemove={() => handleDelete(item.id)}
                      onUpdate={() => handleUpdateByInn({ inn: item.inn })}
                    >
                      <Row gutter={[20, 20]}>
                        {Object.entries(prepItem).map(([key, options]: any) => {
                          return (
                            <MyBusinessDescription
                              key={key}
                              label={options.label}
                              value={options.value}
                            />
                          )
                        })}
                      </Row>
                    </PageCardContainer>
                  </Col>
                )
              })}
            </Row>
          </>
        )}
      />
    </MyProfileLayout>
  )
}

export default withAuth(MyProfileBusiness)
