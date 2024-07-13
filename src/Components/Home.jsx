import React from "react";
import { Link, Navigate } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "./core/homepage/highlighttext"; // Corrected import statement
import CTAButton from "./core/homepage/button";
import Banner from "../assets2/images/banner.mp4"
import VideoComponent from "../Components/core/homepage/VideoComponent"
import CodeBlocks  from "./core/homepage/codeblocks";
import Timelinesection from "./core/homepage/Timelinesection";
import LearningLanguagesection from "./core/homepage/LearningLanguagesection";
import madam from "../assets2/images/madam.jpg"
import p1 from "../assets2/p1.svg"
import HighlightText2 from "./core/homepage/HeighlightText2";
import Instructorsection from "./core/homepage/instructorsection";
import ExploreMore from "./core/homepage/ExploreMore";
import Footer from "./common/Footer";
import ScrollBeam from "./core/homepage/ScrollBeam";
import ReviewSlider
from "./common/review/reviewSlider";
const Home = () => {
  
  return (
    <div className="flex flex-col items-center justify-center mt-12 mx-36 text-white max-w-maxContent  bg-richblack-900 ">

{/* section1 */}
      
<Link to="/signup" className='flex flex-row gap-2 border border-pink-200 rounded-full h-10 w-48 items-center text-center justify-center'>
    Become an Instructor <FaArrowRight className='my-1 text-pink-200' />
  </Link>
      


<div className=" items-center ">  
  <div className=" text-4xl font-semibold my-6 flex flex-row gap-2">
        Enpower Your Future with 
        {/* <HighlightText text={"Coding Skills"} /> Corrected component usage */}
        <HighlightText2 
        codeblock={`Coding Skills`}
        codeColor={"text-blue-100"}/>
      </div>
      </div>
     

      <div className=" text-center mx-32 ">
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
      </div>
    
    <div className=" flex flex-raw gap-8 my-6">
     <CTAButton active={true} linkto={"/signup"}>learn more</CTAButton>
     <CTAButton active={false} linkto={"/login"}>about</CTAButton>
    </div>

<div>
<VideoComponent Banner={Banner}/>
</div>
   
    <div className="my-20 shadow-lg">
  
</div>
{/* codeblocks1 */}

<div>

  <CodeBlocks 
  position={"lg:flex-raw"}

  heading={ 
    <div className="text-4xl font-semibold "> 
      unlock you
      <HighlightText text={"Coding Potential"} />
      {" "}with our online course
      </div>
  }
  subheading={
    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
  }

ctabtn1={ {
  btnText:"try it yourself",
  linkto:"/signup",
  active:true,
}}

ctabtn2={ {
  btnText:"learn more",
  linkto:"/login",
  active:false,
}}
codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
codeColor={"text-yellow-25"}

  ></CodeBlocks>
</div>
{/* codeblocks2 */}
<div className="">

  <CodeBlocks 
     position={"lg:flex-row-reverse"}

  heading={ 
    <div className="text-4xl font-semibold "> 
     Start 
      <HighlightText text={"coding in seconds"} />
      
      </div>
  }
  subheading={
    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."  }

ctabtn1={ {
  btnText:"try it yourself",
  linkto:"/signup",
  active:false,
}}

ctabtn2={ {
  btnText:"learn more",
  linkto:"/login",
  active:true,
}}
codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a></nav>\n</body>`}
codeColor={"text-blue-25"}

  ></CodeBlocks>
</div>

<div className=" translate-y-48">
  <ExploreMore/>
</div>


{/* section2 */}
<div className=" bg-pure-greys-5 text-richblack-700 w-screen">

  
  <div className="">
   <div className="section2_bg">
    <div className=" h-80 w-screen max-w-maxContent flex flex-col items-center gap-5 ">
    <div className=" flex flex-raw gap-8 mt-52 items-center ml-52  ">
     <CTAButton  active={true} linkto={"/signup"}>
      <div className=" flex flex-raw items-center">
      explore full cottage
      <GoArrowRight className=" text-pure-greys-5 text-md my-1 mx-1" />
      </div>
      </CTAButton>
     <CTAButton active={false} linkto={"/login"}>
      <div className=" text-pure-greys-5">
        learn more
      </div>
     </CTAButton>
    </div>
    </div>
   </div>
  </div>

  <div className=" w-11/12 max-w-maxContent flex flex-raw p-32 justify-between gap-5 mx-16"> 
  <div className=" font-bold text-2xl ">
  Get the skills you need for a
  <HighlightText  text={" job that is in demand"} />
  </div>
  <div className=" text-[14px] font-mediumpx-10 ">
The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
<div className=" w-[140px] h-[74px] my-10">
<CTAButton active={true} linkto={"/signup"}>learn more</CTAButton>
</div>

  </div>
  </div>

  <Timelinesection />

 
  <LearningLanguagesection/>
</div>


{/* section3 */}
<div className=" w-screen   flex-col items-center justify-between gap-8 first-letter bg-pure-greys-950 text-white ">

<div className=" pt-14"><Instructorsection/></div>

<div className=" mt-20">
  <p className=" text-3xl font-bold text-richblack-800 text-center">What Our Students Say .</p>
<ReviewSlider />
</div>

</div >




<div className=" w-screen mb-10 "><Footer /></div>

    </div>

  
  );
};

export default Home;
