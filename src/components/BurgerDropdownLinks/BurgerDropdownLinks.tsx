import { MenuOutlined } from '@ant-design/icons'
import type { ButtonProps, MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import Link from 'next/link'
import React, { useMemo } from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'

interface BurgerDropdownLinksProps extends ButtonProps {
  dropdownRender?: React.ReactNode
  links: any[]
}

export const BurgerDropdownLinks: FCC<BurgerDropdownLinksProps> = ({
  dropdownRender,
  links,
}) => {
  const items: MenuProps['items'] = useMemo(
    () =>
      links?.map((link) => ({
        label: (
          <Link href={link.href}>
            <Button type='link'>
              <BebasNeueTitle level={5} title={link.title} />
            </Button>
          </Link>
        ),
        key: link.href,
      })),
    []
  )
  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      dropdownRender={dropdownRender ? () => dropdownRender : undefined}
    >
      <Button
        shape='circle'
        type='text'
        icon={<MenuOutlined />}
        onClick={(e) => e.preventDefault()}
      />
    </Dropdown>
  )
}

BurgerDropdownLinks.displayName = 'BurgerDropdownLinks'

export default BurgerDropdownLinks
