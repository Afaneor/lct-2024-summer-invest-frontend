import React from 'react'
import styles from './LandingFooter.module.scss'
export const LandingFooter = () => {
  return (
    <div className={styles.container}>
      <span>Сделано с ❤️ командой ААА</span>
    </div>
  )
}

LandingFooter.displayName = 'LandingFooter'

export default LandingFooter
