import React from 'react'

import type { OkvedNode } from '@/components/OkvedSelector/OkvedSelector'
import type { FCC } from '@/types'

interface OkvedTitleRenderProps {
  node: OkvedNode
}
export const OkvedTitleRender: FCC<OkvedTitleRenderProps> = ({ node }) => {
  return (
    <span
      style={{
        fontSize: 16,
        fontWeight: 500,
      }}
    >
      {`${node.code} ${node.name}`}
    </span>
  )
}

OkvedTitleRender.displayName = 'OkvedTitleRender'

export default OkvedTitleRender
