import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import {
    addCourseDetails, editCourseDetails, fetchCourseCategories
} from '../../../../services/operation/courseDetails'
import { setCourse, setStep } from "../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../utils/constants"
 import Upload from "../upload"
 import ChipInput from "./ChipInput"
 import RequirementsField from "./Reqirment"
import IconBtn from '../../../common/IconBtn';


const CourseInformationForm = () => {
    const {
        register,
        setValue, 
        getValues,
        formState: {errors},
        handleSubmit
    } = useForm();

    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth)
    const { course, editCourse } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])
    
    useEffect(() => {
      // console.log("Course from slice in the step 1 form is", course)
      // console.log("EditCourse from slice in the step 1 form is", editCourse)
      const getCategories = async () => {
        setLoading(true);
    
        try {
            const response = await fetchCourseCategories();
            console.log("categories response:", response);
    
            const categories = response?.categories; // Extract categories from response data
            console.log("categories:", categories);
    
            if (categories && categories.length > 0) {
                setCourseCategories(categories);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            // Handle error state here
        } finally {
            setLoading(false);
        }
    };
    
      
       // if form is in edit mode
    if (editCourse) {
        // console.log("data populated", editCourse)
        setValue("courseTitle", course.courseName)
        setValue("courseShortDesc", course.description)
        setValue("coursePrice", course.price)
        setValue("courseTags", course.tags)
        setValue("courseBenefits", course.whatWillYouLearn)
        setValue("courseCategory", course.category)
        setValue("courseRequirements", course.instructions)
        setValue("courseImage", course.thumbnail)
      }
      getCategories()
      
    }, [])
    
    const isFormUpdated = () => {
        const currentValues = getValues();

        if(
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
           currentValues.courseTags.toString() !== course.tags.toString() ||
            currentValues.courseBenefits !== course.whatWillYouLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
            course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ) {return true}
        return false
    }

    const onSubmit = async (data)=> {
        console.log("Form Data is", data)
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues()
                const formData = new FormData()
                // console.log(data)
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                formData.append("description", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tags.toString()) {
                formData.append("tags", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                formData.append("whatWillYouLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                formData.append("category", data.courseCategory)
                }
                if (
                currentValues.courseRequirements.toString() !==
                course.instructions.toString()
                ) {
                formData.append(
                    "instructions",
                    JSON.stringify(data.courseRequirements)
                )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                formData.append("thumbnailImage", data.courseImage)
                }
                // console.log("Edit Form data: ", formData)
                setLoading(true)
                const result = await editCourseDetails(formData, token)
                console.log("Result from editcourseDetails:", result);
                setLoading(false)
                if (result) {
                dispatch(setStep(2))
                dispatch(setCourse(result))
                }
            }
            else{
                toast.error("No changes made to the form")
            }
            return
        }

        const formData = new FormData();
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tags", JSON.stringify(data.courseTags))
        formData.append("whatWillYouLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)

        setLoading(true);

        const result = await addCourseDetails(formData, token);
        console.log("Result from addCourseDetails:", result);
        console.log("result",result);
        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result))
        }
        setLoading(false)

    }
  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Course Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseTitle">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-3 text-richblack-5 border border-richblack-700"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course title is required
          </span>
        )}
      </div>
      
      {/* Course Description */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          {...register("courseShortDesc", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] min-h-[130px] bg-richblack-700 p-3 text-richblack-5 border border-richblack-700"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Description is required
          </span>
        )}
      </div>
      
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="coursePrice">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            placeholder="Enter Course Price"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-700 p-3 text-richblack-5 border border-richblack-700"
          />
        </div>
        {errors.coursePrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Price is required
          </span>
        )}
      </div>
      
      {/* Course Category DropDown */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">
          Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-3 text-richblack-5 border border-richblack-700"
        >
          <option className="bg-pure-greys-5 text-richblack-900" value="" disabled>
            Choose a category
          </option>
          {!loading &&
            courseCategories.map((category, index) => (
              <option
                key={index}
                value={category?._id}
                className="bg-pure-greys-5 text-richblack-900"
              >
                {category?.name}
              </option>
            ))}
        </select>
        {errors.courseCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Category is required
          </span>
        )}
      </div>
      
      {/* Tags component */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and Press Enter"
        register={register}
        setValue={setValue}
        getValues={getValues}
        errors={errors}
      />
      
      {/* Upload Component */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />
      
      {/* Benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="courseBenefits">
          Benefits of the course <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter benefits of the course"
          {...register("courseBenefits", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] min-h-[130px] bg-richblack-700 p-3 text-richblack-5 border border-richblack-700"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Benefits of the course is required
          </span>
        )}
      </div>
      
      {/* Requirements/Instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      
      <div className="flex flex-col sm:flex-row justify-end gap-2">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={editCourse ? "Save Changes" : "Next"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}

export default CourseInformationForm