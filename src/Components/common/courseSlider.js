import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import { Autoplay,FreeMode,Navigation, Pagination,EffectCoverflow}  from 'swiper/modules'

import Course_Card from "./cardOfCourse"

const CourseSlider = ({Courses}) => {
  return (
    <>
        {
            Courses?.length ? (
                <Swiper
                 slidesPerView={1}
                    spaceBetween={25}
                    loop={true} 
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                   // slidesPerView={'auto'}
                    coverflowEffect={{
                      rotate: 50,
                      stretch: 0,
                      depth: 100,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    pagination={true}
                    modules={[FreeMode, Pagination, Navigation,EffectCoverflow]}
                    breakpoints={{
                        1024: {
                        slidesPerView: 3,
                        },
                    }}
                    className="max-h-[30rem] mySwiper"
                >
                    {
                        Courses?.map((course, index)=> (
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={"h-[250px]"} />
                            </SwiperSlide>
                        ))
                    }   
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
            )

        }
    </>
  )
}

export default CourseSlider
