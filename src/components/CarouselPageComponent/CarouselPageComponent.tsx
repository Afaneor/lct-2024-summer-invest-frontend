import { Carousel } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { ImageContainer } from '@/components/ImageContainer'

interface CarouselPageComponentProps {
  photo_urls: string[]
  main_photo_url: string
  name: string
}

const CarouselPageComponent: FCC<CarouselPageComponentProps> = ({
  photo_urls,
  main_photo_url,
  name,
}) => {
  return (
    <Carousel arrows>
      {photo_urls?.length ? (
        photo_urls?.map((url: string) => (
          <ImageContainer key={url} src={url} alt={url} height='50vh' />
        ))
      ) : (
        <ImageContainer src={main_photo_url} alt={name} height='50vh' />
      )}
    </Carousel>
  )
}

CarouselPageComponent.displayName = 'CarouselPageComponent'

export default CarouselPageComponent
