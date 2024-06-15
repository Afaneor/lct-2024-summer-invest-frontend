import React from 'react'
import type { FCC } from 'src/types'

import styles from './ImageContainer.module.scss'

interface ImageContainerProps {
  src: string
  alt: string
  width?: string | number
  height?: string | number
}

const ImageContainer: FCC<ImageContainerProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  return (
    <div className={styles.container}>
      <img
        src={src}
        alt={alt}
        style={{
          width,
          height,
        }}
        className={styles.image}
      />
    </div>
  )
}

ImageContainer.displayName = 'ImageContainer'

export default ImageContainer
