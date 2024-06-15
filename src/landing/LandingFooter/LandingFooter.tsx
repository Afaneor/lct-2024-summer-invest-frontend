import React from 'react'
import styles from './LandingFooter.module.scss'
export const LandingFooter = () => {
  return (
    <div className={styles.container} data-testid='test-LandingFooter'>
      <span>Сделано с ♥️ командой DST</span>
    </div>
  )
}

LandingFooter.displayName = 'LandingFooter'

export default LandingFooter
