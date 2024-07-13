import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from "react-icons/ri"
import { formattedDate } from "../../../utils/DateFormator"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setUser,setLoading}  from "../../../slices/profileSlice"
import { useState } from 'react'
import LazyImage from '../../../utils/lazyImage'

const MyProfile = () => {
  const { user, loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true));
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          dispatch(setUser(storedUser));
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [user, dispatch, navigate]);

  useEffect(() => {
    if (user && !imageLoaded) {
      const img = new Image();
      img.src = user.image;
      img.onload = () => {
        setImageLoaded(true);
      };
    }
  }, [user, imageLoaded]);

  const handleNavigate = () => {
    navigate("/dashboard/settings");
  };

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-11/12 max-w-[1500px] py-10 border rounded-md bg-richblack-700">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5 mx-7">My Profile</h1>
      <div className="flex flex-col lg:flex-row gap-8 m-7">
        <div className="flex flex-col items-center justify-center rounded-md border border-richblack-700 bg-richblack-800 p-8 px-10">
          {!imageLoaded && (
            <div className="aspect-square w-[165px] h-[160px] rounded-md object-cover bg-gray-300" />
          )}
          <LazyImage
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className={`aspect-square w-[165px] h-[160px] rounded-md object-cover ${imageLoaded ? '' : 'hidden'}`}
            setImageLoaded={setImageLoaded}
          />
          <div className="space-y-1 my-3">
            <p className="text-lg font-semibold text-richblack-5 mx-3">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm mx-3 text-richblack-300">{user?.email}</p>
          </div>
          <button
            onClick={handleNavigate}
            className="text-richblack-300 hover:scale-105 hover:text-pink-200"
          >
            <RiEditBoxLine />
          </button>
        </div>

        <div className="flex flex-col w-full gap-6">
          <div className="rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
              <p className="text-lg font-semibold text-richblack-5">About</p>
              <button
                onClick={handleNavigate}
                className="text-richblack-300 hover:scale-105 hover:text-pink-200"
              >
                <RiEditBoxLine />
              </button>
            </div>
            <p className={`${user?.additionalDetails?.about ? "text-richblack-5" : "text-richblack-400"} text-sm font-medium`}>
              {user?.additionalDetails?.about ?? "Write Something About Yourself"}
            </p>
          </div>

          <div className="rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
              <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
              <button
                onClick={handleNavigate}
                className="text-richblack-300 hover:scale-105 hover:text-pink-200"
              >
                <RiEditBoxLine />
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
              <div className="flex flex-col gap-y-5">
                <div>
                  <p className="mb-2 text-sm text-richblack-600">First Name</p>
                  <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Email</p>
                  <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Gender</p>
                  <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
                </div>
              </div>
              <div className="flex flex-col gap-y-5">
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                  <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                  <p className="text-sm font-medium text-richblack-5">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
                  <p className="text-sm font-medium text-richblack-5">{formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;