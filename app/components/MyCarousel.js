'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const MyCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
    >
      <SwiperSlide>
        <img src="https://via.placeholder.com/512x512?text=Slide+1" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://via.placeholder.com/512x512?text=Slide+2" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://via.placeholder.com/512x512?text=Slide+3" alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
  );
};

export default MyCarousel;
