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
    <div className="mx-auto w-11/12 max-w-[1500px] py-10 border rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
    <h1 className="mb-14 text-4xl font-bold text-white mx-7 text-center">My Profile</h1>
    <div className="flex flex-col lg:flex-row gap-8 m-7">
      <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-10 shadow-lg transform hover:scale-105 transition-transform duration-300">
        {!imageLoaded && (
          <div className="aspect-square w-[165px] h-[165px] rounded-full bg-gray-300 animate-pulse" />
        )}
        <LazyImage
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className={`aspect-square w-[165px] h-[165px] rounded-full ${imageLoaded ? '' : 'hidden'}`}
          setImageLoaded={setImageLoaded}
        />
        <div className="space-y-2 my-3 text-center">
          <p className="text-xl font-semibold text-gray-900">
            {user?.firstName + " " + user?.lastName}
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
        <button
          onClick={handleNavigate}
          className="text-gray-500 hover:text-pink-500 transform hover:scale-110 transition-transform duration-300 focus:outline-none"
        >
          <RiEditBoxLine size={24} />
        </button>
      </div>
  
      <div className="flex flex-col w-full gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex w-full items-center justify-between">
            <p className="text-xl font-semibold text-gray-900">About</p>
            <button
              onClick={handleNavigate}
              className="text-gray-500 hover:text-pink-500 transform hover:scale-110 transition-transform duration-300 focus:outline-none"
            >
              <RiEditBoxLine size={24} />
            </button>
          </div>
          <p className={`${user?.additionalDetails?.about ? "text-gray-800" : "text-gray-400"} text-sm font-medium mt-2`}>
            {user?.additionalDetails?.about ?? "Write Something About Yourself"}
          </p>
        </div>
  
        <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex w-full items-center justify-between">
            <p className="text-xl font-semibold text-gray-900">Personal Details</p>
            <button
              onClick={handleNavigate}
              className="text-gray-500 hover:text-pink-500 transform hover:scale-110 transition-transform duration-300 focus:outline-none"
            >
              <RiEditBoxLine size={24} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600">First Name</p>
                <p className="text-sm font-medium text-gray-900">{user?.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="text-sm font-medium text-gray-900">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="text-sm font-medium text-gray-900">{user?.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone Number</p>
                <p className="text-sm font-medium text-gray-900">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Date Of Birth</p>
                <p className="text-sm font-medium text-gray-900">{formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add Date Of Birth"}</p>
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