'use client'
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '@/app/config/firebase';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';

const MyCarousel = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const folderRef = ref(storage, 'slider');
        const { items } = await listAll(folderRef);
        const urls = await Promise.all(items.map(item => getDownloadURL(item)));
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchImageUrls();
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      {imageUrls.map((url, index) => (
        <SwiperSlide key={index}>
          <img src={url} alt={`Slide ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MyCarousel;
