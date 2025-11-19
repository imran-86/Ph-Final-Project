import React from 'react';

import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import amazon from '../../../assets/brands/amazon.png'
import amazon_vector from '../../../assets/brands/amazon_vector.png'

import casio from '../../../assets/brands/casio.png'
import moonStar from '../../../assets/brands/moonstar.png'
import randStad from '../../../assets/brands/randstad.png'
import start_people from '../../../assets/brands/start_people.png'
import start from '../../../assets/brands/star.png'


const  brandLogos = [amazon,amazon_vector,casio,moonStar,randStad,start_people,start]


const Brands = () => {
    return (
      <Swiper
          slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        autoplay  = {{
            delay: 1500,
            disableOnInteraction : false
        }}
       
       
      >
        
        {
            brandLogos.map((logo,index)=><SwiperSlide key={index}><img src={logo} alt="" /></SwiperSlide>)
        }
        
      </Swiper>
    );
};

export default Brands;