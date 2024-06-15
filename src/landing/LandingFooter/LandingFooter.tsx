import React from 'react'
import styles from './LandingFooter.module.scss'
import Logo from '@/components/_icons/logo/Logo'
import { BebasNeueTitle } from '@/components/BebasNeueTitle'
export const LandingFooter = () => {
  return (
    <div className={styles.container}>
      <Logo />
      <BebasNeueTitle level={5} title={'Сделано с ❤️ командой ААА'} />
    </div>
  )
}

LandingFooter.displayName = 'LandingFooter'

export default LandingFooter
