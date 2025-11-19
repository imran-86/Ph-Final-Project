import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReviewCard from './ReviewCard';



const Reviews = ({reviewsPromise}) => {
    
    const reviews = use(reviewsPromise);
    // console.log(reviews);
    
    return (
          <div className='my-24'>
           <div>
            <h3 className='text-3xl text-center font-bold'>Reviews</h3>
           </div>
          
          <Swiper
          loop = {true}
          autoplay = {{
            delay : 1500,
            disableOnInteraction: false
          }}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 30,
          stretch: '50%',
          depth: 200,
          modifier: 1,
          slideShadows: true,
          scale: 0.75
          
        }}
        pagination={true}
        modules={[EffectCoverflow,Autoplay, Pagination]}
        className="mySwiper"
      >
        {
            reviews.map(review => <SwiperSlide key={review.id}>
          <ReviewCard review={review}></ReviewCard>
        </SwiperSlide>)
        }
        
      </Swiper>
      </div>
    );
};

export default Reviews;