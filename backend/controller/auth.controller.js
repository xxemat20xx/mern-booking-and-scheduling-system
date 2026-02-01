import User from '../models/user.model.js'
import { sendEmail } from '../utils/email.js'

// generate otp helper
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
export const register = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const existing = await User.findOne({ email });
        if(existing){
            return res.status(400).json({
                message: "User already exist"
            })
        }
        const otp = generateOTP();
        const otpExpiry = Date.now() + 10 * 60 * 1000; //10mins

        const newUser = new User({name, email, password, otp, otpExpiry});
        await newUser.save(); // save to DB

        //send email verification
        await sendEmail(
        email,
        "Verify your email",
        `<h2>Your OTP is: ${otp}</h2>`
        );


        res.status(201).json({message: "User registered. OTP sent to email."})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });

    }
};
export const verify = async(req, res) => {};
export const resendOtp = async(req, res) => {};
export const login = async(req, res) => {};
export const forgetPassword = async(req, res) => {};
export const resetPassword = async(req, res) => {};
