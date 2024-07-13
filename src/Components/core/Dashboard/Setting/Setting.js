import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAcoount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <>
     
      
      <div className=" max-w-[80%] items-center mx-14 ">
        
         <h1 className="mb-14 text-3xl font-medium text-richblack-5 ">
        Edit Profile
      </h1>

      <ChangeProfilePicture />
  
      <EditProfile />
    
      <UpdatePassword />
    
      <DeleteAccount />
      </div>
     
    </>
  )
}