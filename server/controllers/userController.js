import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import sendOtpEmail  from "../services/emailServices.js";

//create token function
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
//user login api
const loginUser = async (req,res) => {
    try {
        const  {email, password} = req.body;

        //check if user already exists
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success:false, message:"User doesn't exists"})
        }

        //check whether password matches or not
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const  token = createToken(user._id)
            res.json({success:true, token})
        }
        else {
            res.json({success:false, message:"Invalid credentials"})
        }

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
//user registration route
const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.json({success: false,message: "All fields are required"});
        }
        //check user already exists or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message:"User already exists"})
        }
        
        //validating email format n password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Password should be at least 8 characters"})
        }

        //hash password before it gets store in DB
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        await otpModel.findOneAndDelete({ email });

        await otpModel.create({
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpiry
        });
        //send otp email
        await sendOtpEmail(email, otp);
        res.json({success: true,message: "OTP sent successfully"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//verify otp api
const verifyOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({success: false,message: "Email and OTP are required"});
        }
        const otpData = await otpModel.findOne({ email });

        if (!otpData) {
            return res.json({ success: false,message: "OTP not found. Please register again."});
        }

        // Check OTP
        if (otpData.otp !== otp) {
            return res.json({ success: false, message: "Invalid OTP"});
        }

        // Check Expiry
        if (otpData.otpExpiry < new Date()) {
            await otpModel.deleteOne({ email });
            return res.json({success: false,message: "OTP has expired"});
        }

        // Check user doesn't already exist
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            await otpModel.deleteOne({ email });
            return res.json({success: false,message: "User already exists"});
        }

        // Create User
        const newUser = new userModel({
            name: otpData.name,
            email: otpData.email,
            password: otpData.password,
        });

        const user = await newUser.save();
        await otpModel.deleteOne({ email });
        const token = createToken(user._id);
        res.json({success: true,message: "Registration Successful",token});

    } catch (error) {
        console.log(error);
        res.json({success: false,message: error.message});
    }
};

export { registerUser, loginUser, verifyOtp }