import type { TreeProps } from 'antd'
import { Col, Input, Row, Tree } from 'antd'
import type { DataNode } from 'antd/es/tree'
import type { ChangeEvent } from 'react'
import React, { useState } from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/chat/components/BebasNeueTitle'
import okveds from '@/components/OkvedSelector/okved.json'
import { OkvedTitleRender } from '@/components/OkvedTitleRender'

interface OkvedSelectorProps {
  value: React.Key[]
  onCheck: TreeProps['onCheck']
}

export interface OkvedNode extends DataNode {
  code: string
  name: string
  items?: OkvedNode[]
}

const searchInputStyle = { borderRadius: 0, marginBottom: 20 }
const OkvedSelector: FCC<OkvedSelectorProps> = ({ onCheck, value }) => {
  const [okvrdsData, setOkvrdsData] = useState<OkvedNode[]>(
    okveds as OkvedNode[]
  )
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(value)
  const [searchValue, setSearchValue] = useState<string>('')

  const filterTree = (
    nodes: OkvedNode[],
    search: string,
    expandedKeysSet: Set<React.Key>
  ): OkvedNode[] => {
    return nodes
      .map((node) => {
        if (
          node.name.toLowerCase().includes(search.toLowerCase()) ||
          node.code.toLowerCase().includes(search.toLowerCase())
        ) {
          expandedKeysSet.add(node.code)
          return node
        }
        if (node.items) {
          const children = filterTree(node.items, search, expandedKeysSet)
          if (children.length) {
            expandedKeysSet.add(node.code)
            return { ...node, items: children }
          }
        }
        return null
      })
      .filter((node) => node !== null) as OkvedNode[]
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: searchStr } = e.target
    setSearchValue(searchStr)
    if (!searchStr) {
      setExpandedKeys([])
      setOkvrdsData(okveds as OkvedNode[])
      return
    }

    const expandedKeysSet = new Set<React.Key>()
    const filteredData = filterTree(
      okveds as OkvedNode[],
      searchStr,
      expandedKeysSet
    )
    setOkvrdsData(filteredData)
    setExpandedKeys(Array.from(expandedKeysSet))
  }

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <BebasNeueTitle level={3} title='Поиск по классификатору ОКВЭД' />
      </Col>
      <Col span={24}>
        <Input
          style={searchInputStyle}
          size='large'
          placeholder='Введите название или код ОКВЭД'
          value={searchValue}
          onChange={onSearchChange}
        />
        <span>Выбрано: {value?.length || 0}</span>
      </Col>
      <Col
        span={24}
        style={{
          height: '100%',
        }}
      >
        <Tree
          height={500}
          fieldNames={{ title: 'name', key: 'code', children: 'items' }}
          checkable
          treeData={okvrdsData}
          // eslint-disable-next-line react/no-unstable-nested-components
          titleRender={(node) => <OkvedTitleRender node={node} />}
          checkedKeys={value}
          onCheck={onCheck}
          expandedKeys={expandedKeys}
          onExpand={setExpandedKeys}
        />
      </Col>
    </Row>
  )
}

OkvedSelector.displayName = 'OkvedSelector'

export default OkvedSelector
