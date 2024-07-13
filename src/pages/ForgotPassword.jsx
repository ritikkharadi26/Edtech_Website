import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BiArrowBack } from "react-icons/bi"
import { getPasswordResetToken } from "../services/operation/authAPI"

const ForgotPassword = () => {
const[emailsent,setemailsent]=useState(false);
const [email,setemail]=useState("");
const {loading}=useSelector((state)=>state.auth)
const dispatch=useDispatch();


const handleonsubmit=(e)=>{
  e.preventDefault();
  dispatch(getPasswordResetToken(email, setemailsent))


}


  return (
    <div className='flex justify-around text-lg text-red bg-richblack-900'>
    {loading ? (
      <div class="custom-loader"></div>
    ) : (
      <div className=' w-[25%] m-14 py-24 px-4'> 
        <h1 className=' text-2xl font-semibold text-pure-greys-5'> {!emailsent? "Reset your password":"Check email"} </h1>

        <p className=' font-normal text-richblack-50 text-base my-4'> {!emailsent?"Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery":`we have sent the reset email to ${email}`}</p>
     <form onSubmit={handleonsubmit}>
      { !emailsent && (
        <label >

          <p className=' text-richblack-5 text-sm font-normal my-2'>
            Email Address
          </p>

          <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  placeholder="Enter email address"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[10px] text-richblack-5"
                />
        </label>
      )}

      <button  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-normal text-richblack-900" type=' submit'>
        {!emailsent ?"Reset Password":"resend email"}
      </button>
      
     </form>
     
     <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5 text-sm">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
      </div> 

    )}
  </div>
  )

}
export default ForgotPassword