const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const crypto = require("crypto"); 
const mailSender = require("../utils/MailSender");
const {courseEnrollmentEmail} = require("../mails/templetes/CourseEnrollmentEmail");
const { default: mongoose, Mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mails/templetes/PymentSuccessfulEmail");

const CourseProgress = require("../models/CourseProgress")

exports.capturePayment = async (req, res) => {
    const {courses} = req.body;
    const userId =  req.user.id;

    if (courses.length === 0) {
        return res.json({
            success:false,
            message:"Provide courseId"
        })
    }

    let totalAmount = 0;

    for (const courseId of courses){
        let course;
        try {
            
            course = await Course.findById(courseId);
            console.log("course id",course);
            if(!course){
                return res.status(200).json({
                    success:false,
                    message:"Course doesn't exist"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"User already registered"
                })
            }

            totalAmount += parseInt(course.price);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
                
            })
        }
    }
    
    console.log("The amount in capturePayment is", totalAmount)
    const currency = "INR"
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString()
    }

    try {
        const paymentResponse = await instance.orders.create(options)
        res.json({
            success:true,
            message: paymentResponse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, mesage:"Could not Initiate Order"});
    }
}

exports.verifyPayment = async (req,res) => {
    console.log("request in verifyPayment is", req)
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                    .update(body.toString())
                                    .digest("hex")

    if (expectedSignature === razorpay_signature) {
        
        await enrollStudents(courses, userId, res);

        return res.status(200).json({success:true, message:"Payment Verified"});
    }
    return res.status(200).json({success:"false", message:"Payment Failed"});
}

const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try {
            const updatedCourse = await Course.findByIdAndUpdate(courseId,
                {
                    $push: {
                        studentEnrolled: userId
                    }
                }, {new:true})  

            if (!updatedCourse) {
                return res.status(500).json({success:false,message:"Course not Found"});
            }

            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completedVideos: [],
            })

            const updatedStudent = await User.findByIdAndUpdate(userId, {
                $push: {
                    courses: courseId,
                   courseProgress: courseProgress._id,
                }
            }, {new: true})

            const emailResponse = await mailSender(
                updatedStudent.email,
                `Successfully Enrolled into ${updatedCourse.courseName}`,
                courseEnrollmentEmail(updatedCourse.courseName, `${updatedStudent.firstName}`)
            )
        } catch (error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }
}

exports.sendPaymentSuccessEmail = async (req,res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try {
        const user = await User.findById(userId);
        await mailSender(
            user.email,
            `Payment Received`,
            paymentSuccessEmail(`${user.firstName}`,
             amount/100,orderId, paymentId)
        )
    } catch (error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}

// // Capture the payment and initiate the razorpay order
// exports.capturePayment = async (req, res) => {
//     // Get course id and user id
//     const userID = req.user.id;
//     const { course_id } = req.body;

//     // Validation
//     if (!course_id) {
//         return res.json({
//             success: false,
//             message: "Provide valid course id",
//         });
//     }

//     // Validate course details
//     let course;
//     try {
//         // Invalid course id
//         course = await Course.findById(course_id);
//         if (!course) {
//             return res.json({
//                 success: false,
//                 message: "Could not find course",
//             });
//         }

//         // If user has already paid for the same course
//         const uid = mongoose.Types.ObjectId(userID);

//         if (course.studentEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success: false,
//                 message: "Student already enrolled",
//             });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }

//     // Create order
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes: {
//             courseId: course_id,
//             userID,
//         },
//     };

//     try {
//         // Initiation of payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         // Return response
//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//         });

//     } catch (error) {
//         console.log(error);
//         return res.json({
//             success: false,
//             message: "could not initiate order",
//         });
//     }
// };

// // verify signature of razorpay and server
// exports.verifySignature = async (req, res) => {
//     // Secret key provided by Razorpay for verifying webhook signature
//     const webhookSecret = '12345678';

//     // Extracting signature from the request headers, provided by Razorpay
//     const signature = req.header["x-razorpay-signature"];

//     // Creating an HMAC object using SHA-256 hashing algorithm and the webhook secret
//     const shasum = crypto.createHmac("sha256", webhookSecret);

//     // Updating the HMAC object with the JSON stringified request body to prepare for hashing
//     shasum.update(JSON.stringify(req.body));

//     // Obtaining the hashed value (digest) from the HMAC object in hexadecimal format
//     const digest = shasum.digest("hex");

//     // Check if the obtained digest matches the signature provided by Razorpay
//     // If they match, it means the payment is authorized and the webhook request is valid
//     if (signature === digest) {
//         console.log("Payment is authorized");
//         return res.json({
//             success: true,
//             message: "Authorization successful"
//         })
//     }
//     //now signature is authorized we have to write hndler of action after that
//     //we have 2 action==>(1) update student with enrolledcourse by giving course id
//     //                   (2) update course with enrolledstudents by giving user id
//     //here we do not have both ids directly we will fetch both from order where we have sended as a note
//     try {
//         // Extracting courseId and userId from the notes of the payment entity in the webhook payload because we do not have these directly
//         const { courseId, userID} = req.body.payload.payment.entity.notes;

//         // Updating the course document to add the enrolled student
//         const enrolledCourse = await Course.findByIdAndUpdate(courseId, { $push: { studentEnrolled: userID } }, { new: true });
//         console.log(enrolledCourse);

//         // If the course document is not found, return an error response
//         if (!enrolledCourse) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Course not found"
//             })
//         }

//         // Updating the user document to add the enrolled course
//         const enrolledStudent = await User.findByIdAndUpdate(userID , { $push: { courses: courseId } }, { new: true });
//         console.log(enrolledStudent);

//         // Sending an enrollment email to the student to notify them about their successful enrollment
//         const emailResponse = await MailSender(enrolledStudent.email, "Congratulations, you are enrolled", "Congrats!");
//         console.log(emailResponse);

//         // Returning a success response after successfully processing the webhook request
//         return res.json({
//             success: true,
//             message: "Signature verified and course added"
//         });
//     }
//     catch (error) {
//         // Handling errors that may occur during processing of the webhook request
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "An error occurred",
//         });
//     }
// };
// //The webhook secret remains constant and is used for generating and verifying signatures.
// //The signature changes with each webhook payload but is generated using the constant webhook secret and the contents of the payload.
// //Your server verifies the authenticity of each webhook payload by comparing the signature included in the request headers with
//  //the recalculated signature based on the payload contents and the webhook secret.