import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import React from 'react'
import type { FCC } from 'src/types'

interface BreadCrumbsComponentProps {
  breadCrumbs: ItemType[]
}

const homeCrumb = {
  href: '/',
  title: <HomeOutlined />,
}

const BreadCrumbsComponent: FCC<BreadCrumbsComponentProps> = ({
  breadCrumbs,
}) => {
  return <Breadcrumb items={[homeCrumb, ...breadCrumbs]} />
}

BreadCrumbsComponent.displayName = 'BreadCrumbsComponent'

export default BreadCrumbsComponent
