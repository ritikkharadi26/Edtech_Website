import React, { useEffect, useState } from 'react'
import RatingStars from './ratingStar'
import GetAvgRating from '../../utils/avgRating'
import { Link } from 'react-router-dom';


const Course_Card = ({ course, Height }) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course]);

    return (
        <div className="bg-white shadow-md rounded-md overflow-hidden transform transition-transform hover:scale-105 max-w-xs my-12">
            <Link to={`/courses/${course._id}`} className="">
                <div className="relative">
                    <img 
                        src={course?.thumbnail}
                        alt='course thumbnail'
                        className={`${Height} w-full object-cover`}
                    />
                </div>
                <div className="p-3">
                    <h2 className="text-base font-semibold text-gray-900 truncate">{course?.courseName}</h2>
                    <p className="text-xs text-gray-600 mb-1 truncate">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div className="flex items-center mb-2">
                        <span className="text-yellow-500 font-semibold">{avgReviewCount.toFixed(1)}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className="text-gray-500 ml-2">({course?.ratingAndReviews?.length})</span>
                    </div>
                    <p className="text-base font-semibold text-gray-900">₹{course?.price}</p>
                </div>
            </Link>
        </div>
    );
}

export default Course_Card;
