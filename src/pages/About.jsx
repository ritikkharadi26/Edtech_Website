import React from 'react';
import { Link } from 'react-router-dom';
import HighlightText from '../Components/core/homepage/highlighttext';
import about1 from "../assets2/images/about11.jpg"
import about2 from "../assets2/images/about2.jpg"
import about3 from "../assets2/images/about3.jpg"
import about4 from "../assets2/images/about4.jpg"
import Stats from "../Components/core/about/stats"
import LearningGrid from '../Components/core/about/LearningGrid';
import ContactUsForm from '../Components/core/contactUs/contactUsForm';
import Footer from '../Components/common/Footer';
const About = ({ children, active, linkto }) => {
    return (
       <div>
          <section className=' bg-pure-greys-700 h-[500px]  '>
            <div className=' relative mx-28 max-w-maxContent flex flex-col  gap-10 text-center text-white item-centre'>
            <div className='my-24 flex flex-col items-center justify-center text-center'>
  <header className='text-3xl text-pure-greys-5 font-bold w-[600px]'>
    Driving Innovation in Online Education for <HighlightText text={"Bright Future"} />
  </header>
  <p className=' text-base text-center font-semibold text-richblack-50 my-6 w-[800px]'>Studynotion is at the forefront of driving innovation in online education. 
    We're passionate about creating a brighter future by offering cutting-edge courses, 
    leveraging emerging technologies, and nurturing a vibrant learning community.
  </p>
</div>


            <div className=' flex flex-raw gap-6 mx-28 translate-y-[-35%]'> 
             <img className=' h-[250px] w-[320px]' src={about1}/>
             <img className=' h-[250px] w-[320px]' src={about2}/>
             <img className=' h-[250px] w-[320px]' src={about3}/>
            </div>
          </div>
          </section>

          <div className=' my-48 mx-32'> <p className=' text-3xl text-pure-greys-5 font-bold w-[1200px] text-center '> We are passionate about revolutionizing the way we learn.
             Our innovative platform <HighlightText  text={" combines technology"}/> <span className=' text-pink-400 font-bold'> , expertise</span>, 
             and community to create an  <span className='gradient-text'> unparalleled educational experience.</span></p></div>
         

         <div className=' flex flex-row justify-evenly'>
            <div className=' text-pure-greys-5 flex flex-col w-[460px] text-justify'>
                <span className='text text-3xl font-bold'>Our Founding Story </span>
                <p className='text-base text-richblack-100 my-4' >Our e-learning platform was born out of a shared vision and passion for transforming education.
                     It all began with a group of educators, technologists, and lifelong learners who recognized 
                     the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                <p className='text-base text-richblack-100 '>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education 
                    . We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries.
                     We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full
                      potential.</p>
            </div>
            <div className=' items-center '>
                  <img className=' h-[250px] w-[380px]  my-16' src={about4}/></div>
           
         </div>

         <div> 
            <div className=' flex flex-row justify-evenly my-36 mx-14'> 
            <div className=' text-pure-greys-5 flex flex-col w-[460px] text-justify mx-4'>
                <span className='  text-caribbeangreen-200 text-3xl font-bold'>Our Vision </span>
                <p className='text-base text-richblack-100 my-4' >With this vision in mind, we set out on a journey to create an e-learning platform 
                that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive
                 platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                
            </div>

            <div className=' text-pure-greys-5 flex flex-col w-[460px] text-justify'>
                <span className=' text-pink-400 text-3xl font-bold'>Our Mission </span>
                <p className='text-base text-richblack-100 my-4' >our mission goes beyond just delivering courses online. We wanted to create a vibrant 
                community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an 
                environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                
            </div>
            </div>
         </div>

         <Stats/>
 
         <section className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white'>
        <LearningGrid />
       
      </section>
         

      <div className='mx-auto my-10'>
      <h1 className='text-center text-3xl text-richblack-5 font-semibold'>
        Get in Touch
      </h1>
      <p className='text-center text-richblack-300 mt-3'>
        We'd love to here for you, Please fill out this form.
      </p>
      <div className='mt-12 mx-auto'>
        <ContactUsForm />
      </div>
    </div>
    <Footer />
       </div>
    );
};

export default About;
