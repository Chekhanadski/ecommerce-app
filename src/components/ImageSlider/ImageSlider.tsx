import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './styles.module.css';

SwiperCore.use([Navigation]);

type ProductImageSliderProps = {
  images: string[];
};

function ImageSlider({ images }: ProductImageSliderProps) {
  return (
    <Swiper
      spaceBetween={1}
      slidesPerView='auto'
      navigation={images.length > 1}
      pagination={images.length > 1 ? { clickable: true } : false}>
      {images.map((image, index) => (
        <SwiperSlide key={image}>
          <img src={image} alt={`This is ${index + 1}`} className={styles.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSlider;
