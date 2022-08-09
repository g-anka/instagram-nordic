import { FC } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import styled from 'styled-components'

type ImagesProps = {
    images: string[]
}

const Images: FC<ImagesProps> = ({ images }) => {
    return(
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                loop
            >
                {images.map((image) => (
                    <SwiperSlide key={image}>
                        <Image src={image} alt=""/>
                    </SwiperSlide>
                ))}
            </Swiper>
    )
}

export default Images

const Image = styled.img `
    aspect-ratio: 1.5;
    max-width: 100%;
    object-fit: contain;
    width: 100%;
`