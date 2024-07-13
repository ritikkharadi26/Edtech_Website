const  User=require("../models/User");
const OTP=require('../models/OTP');
const otpGenerator=require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const mailSender = require('../utils/MailSender');
const passwordUpdate =require('../mails/templetes/passwordUpdate');
require("dotenv").config();

//send otp
exports.sendOtp = async (req, res) => {
    try {
      // fetch email from request body
      const { email } = req.body;
  
      // check if user already exists
      const checkUserPresent = await User.findOne({ email });
      if (checkUserPresent) {
        return res.status(401).json({
          success: false,
          message: "User already exists",
        });
      }
  
      // generate OTP
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      console.log("OTP generated successfully:", otp);
  
      // ensure OTP is unique
      let result = await OTP.findOne({ otp });
      while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        result = await OTP.findOne({ otp });
      }
  
      // create OTP entry in the database
      const otpPayload = { email, otp };
      const otpBody = await OTP.create(otpPayload);
      console.log("OTP saved to DB:", otpBody);
  
      // send OTP email
      const title = "Your OTP Code";
      const body = `<p>Your OTP code is: <b>${otp}</b></p>`;
      await mailSender(email, title, body);
  
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

//signup route handler
exports.signup = async (req, res) => {
    try {
        // Get data from request body
        const { firstName, lastName, email, password, accountType, contactNo, otp, confirmPassword } = req.body;

        // Validate if all required fields are provided
        if (!firstName || !lastName || !email || !password || !otp || !confirmPassword) {
            return res.status(403).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and Confirm Password do not match',
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            });
        }

        // Find the most recent OTP stored for the user
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
        
        // Validate if OTP exists and matches
        if (!recentOtp) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } 
        if (recentOtp.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Secure password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating profile details
        const profileDetails = await Profile.create({
            gender: null,
            dob: null,
            about: null,
            contactNumber: null,
        });

        // Create user entry
        const user = await User.create({
            firstName,
            lastName,
            email,
            accountType,
            contactNo,
            password: hashedPassword,
            additionalDetails: profileDetails._id,
            image: `http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            message: 'User registered successfully',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again later',
        });
    }
}

//login
exports.login = async (req,res) => {
    try {

        //data fetch
        const {email, password} = req.body;
        //validation on email and password
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:'PLease fill all the details carefully',
            });
        }

        //check for registered user
        let user = await User.findOne({email});
        //if not a registered user
        if(!user) {
            return res.status(401).json({
                success:false,
                message:'User is not registered',
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            accountType:user.accountType,
        };

        //verify password & generate a JWT token
        if(await bcrypt.compare(password,user.password) ) {
            //password match
           const token =  jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h",
                                });

                                
            // user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
               expires: new Date( Date.now() + 3*24*60*60*1000),
                // expires: new Date(Date.now() + 2 * 60 * 1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged in successfully',
            });

            // res.status(200).json({
            //     success:true,
            //     token,
            //     user,
            //     message:'User Logged in successfully',
            // });
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success:false,
                message:"Password Incorrect",
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });

    }
}


//change password


exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		// if (newPassword !== confirmNewPassword) {
		// 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
		// }

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
        const title = "Mail from EduPLus for Updation Of Password:";
      const body = `<p>Your New Password is: <b>${newPassword}</b></p>`;
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                title,
                body
				
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};