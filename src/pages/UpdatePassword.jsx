// not working properly because its unable to fetch token correctly since our smtp email request is not working
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operation/authAPI';
import { Link} from "react-router-dom"

const UpdatePassword = () => {
    
   const {loading }=useSelector((state)=>state.auth)
   const navigate=useNavigate();
   const dispatch=useDispatch();
   const location=useLocation();

   const [formdata,setformdata]=useState({
    password:"",
    confirmPassword:""
   })

   const {password,confirmPassword}=formdata;
   const [showPassword,setShowPassword]=useState(false);
   const [showConfirmPassword,setShowConfirmPassword]=useState(false);
 
   const handleOnChange=(event)=>{
  setformdata({
    ... formdata,
    [event.target.name]:event.target.value
  })
   }

   const handleOnSubmit=(event)=>{
    event.preventDefault();
    const token=location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token,navigate))
   }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center ">
    { loading ?(<div> </div>)
    :
    (
    <div className=' w-[25%] m-14 py-24 px-4'> 
           <h1 className="text-2xl font-semibold text-pure-greys-5">
            Choose new password
          </h1>
          <p className="my-4 font-normal text-richblack-50 text-base ">
            Almost done. Enter your new password and youre all set.
          </p>

          <form onSubmit={handleOnSubmit} >
            <label >
                <p className=' text-richblack-5 text-sm font-normal my-2'> New Password</p>
                <input 
                required
                type={showPassword ? "text" : "password"}
                name='password' 
                value={password}
                placeholder='enter new password'
                onChange={handleOnChange} 
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5"/>
         
           <span onClick={()=>setShowPassword((prev)=>!prev)}>
          { showPassword?(
             <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ):(   <AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
          </span>
          </label>

          <label >
                <p className=' text-richblack-5 text-sm font-normal my-2'> Confirm New Password</p>
                <input 
    required
    type={showConfirmPassword ? "text" : "password"}
    name='confirmPassword'  
    value={confirmPassword}
    placeholder='Enter confirm password'
    onChange={handleOnChange}
    style={{
        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
    }}
    className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5"
/>

        
        

          <span onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
          { showConfirmPassword?(
             <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ):(   <AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
          </span>
          </label>


          <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
    </div>
    )}
      
      
    </div>
  )
}

export default UpdatePassword