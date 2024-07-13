import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import 'swiper/css/navigation';
import "swiper/css/pagination"
//  import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination, Navigation } from "swiper/modules"

// Get apiFunction and the endpoint
import { apiConnector } from "../../../services/apiconnectors"
import { ratingsEndpoints } from "../../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    (async () => {
      const { data } = await apiConnector(
        'GET',
        ratingsEndpoints.REVIEWS_DETAILS_API
      );
      if (data?.success) {
        setReviews(data?.data);
      }
    })();
  }, []);

  console.log(reviews);

  return (
    <div className="text-white">
      <div className="my-12 max-w-7xl mx-auto px-4 relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 30 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-3 bg-pure-greys-5 h-full p-10  rounded-lg shadow-lg">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt=""
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-900">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-sm font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>
                <p className="font-normal text-richblack-700">
                  {review?.review.split(' ').length > truncateWords
                    ? `${review?.review.split(' ').slice(0, truncateWords).join(' ')} ...`
                    : `${review?.review}`}
                </p>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-yellow-100">
                    {review.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev absolute left-5 transform -translate-x-10 top-1/2 -translate-y-1/2 z-10 text-richblack-600"></div>
        <div className="swiper-button-next absolute right-5 transform translate-x-10 top-1/2 -translate-y-1/2 z-10"></div>
      </div>
    </div>
  );
}

export default ReviewSlider;