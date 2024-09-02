'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductImageGallery = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleThumbnailClick = (url, index) => {
        setSelectedImage(url);
        setActiveIndex(index);
    };

    return (
        <div>
            <div className='w-full h-80 flex justify-center'>
                {selectedImage && (
                    <Image 
                        src={selectedImage} 
                        alt="Selected Product Image" 
                        height={400} 
                        width={400} 
                        className='object-contain w-40' 
                        priority
                    />
                )}
            </div>
            
            <div className='w-full mt-4'>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                >
                    {images.map((url, index) => (
                        <SwiperSlide key={index}>
                            <div className={`p-2 flex justify-center ${index === activeIndex ? 'border border-gray-600 rounded' : ''}`}>
                                <Image
                                    src={url}
                                    alt={`Product thumbnail ${index + 1}`}
                                    height={50}
                                    width={50}
                                    className="object-contain cursor-pointer w-20 h-20"
                                    onClick={() => handleThumbnailClick(url, index)}
                                />    
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductImageGallery;
