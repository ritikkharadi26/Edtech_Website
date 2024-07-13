import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"

import CountryCode from "../../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            // console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form className='flex flex-col gap-7 items-center w-96 mx-auto text-pure-greys-50 font-semibold text-base' onSubmit={handleSubmit(submitContactForm)}>

    <div className='flex flex-raw gap-5 w-full '>
        {/* firstName */}
        <div className='flex flex-col gap-2'>
            <label className='text-sm' htmlFor='firstname'>First Name</label>
            <input  
                type='text'
                name='firstname'
                id='firstname'
                placeholder='Enter first name'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5" 
                  {...register("firstname", {required:true})}
            />
            {errors.firstname && <span className="text-red-500 text-sm">Please enter Your name</span>}
        </div>

        {/* lastName */}
        <div className='flex flex-col gap-2'>
            <label className='text-sm' htmlFor='lastname'>Last Name</label>
            <input  
                type='text'
                name='lastname'
                id='lastname'
                placeholder='Enter Last name'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5" 
                  {...register("lastname")}
            />
        </div>
    </div>

    {/* email */}
    <div className='flex flex-col gap-2 w-full'>
        <label className='text-sm' htmlFor='email'>Email Address</label>
        <input 
            type='email'
            name='email'
            id='email'
            placeholder='Enter email Address'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5"
               {...register("email", {required:true})}
        />
        {errors.email && <span className="text-red-500 text-sm">Please enter your email address</span>}
    </div>

    {/* phoneNo */}
    <div className='flex flex-col gap-2 w-full' >
        <label className='text-sm' htmlFor='phonenumber'>Phone Number</label>
        <div className='flex gap-2'>
            {/* dropdown */}
            <select
                name='countrycode'
                id="countrycode"
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[70px] rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5"
                    {...register("countrycode", {required:true})}
            >
                {CountryCode.map((element, index) => (
                    <option key={index} value={element.code}>
                        {element.code} - {element.country}
                    </option>
                ))}
            </select>
            <input
                type='number'
                name='phonenumber'
                id='phonenumber'
                placeholder='12345 67890'
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5"
                   {...register("phoneNo",  
                {
                    required:{value:true, message:"Please enter Phone Number"},
                    maxLength: {value:10, message:"Invalid Phone Number"},
                    minLength:{value:8, message:"Invalid Phone Number"}
                })}
            />
        </div>
        {errors.phoneNo && <span className="text-red-500 text-sm">{errors.phoneNo.message}</span>}
    </div>

    {/* message */}
    <div className='flex flex-col gap-2 w-full'>
        <label className='text-sm' htmlFor='message'>Message</label>
        <textarea 
            name='message'
            id='message'
            rows="7"
            placeholder='Enter Your message here'
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5"
              {...register("message", {required:true})}
        />
        {errors.message && <span className="text-red-500 text-sm">Please enter your message.</span>}
    </div>

    <button 
        type='submit'
        className=' w-full rounded-md bg-yellow-50 text-white px-6 py-3 font-bold transition-all duration-200 hover:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed'
        disabled={loading}
    >
        {loading ? 'Sending...' : 'Send Message'}
    </button>
</form>

  )
}

export default ContactUsForm