import User from '../models/user.model.js'
import crypto from 'crypto'

import { sendEmail } from '../utils/email.js'
import { cookieOptions } from '../utils/cookie.js';
import { hashToken } from '../utils/hashToken.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';
import { otpEmailTemplate } from '../utils/emailTemplate.js';

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
        otpEmailTemplate({name, otp})
        );


        res.status(201).json({message: "User registered. OTP sent to email."})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });

    }
};
export const verify = async(req, res) => {
    const { email, otp } = req.body;
    try {
         console.log("VERIFY BODY:", req.body);
        console.log("EMAIL:", email);
        console.log("OTP:", otp, typeof otp);
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: "User not found" });
        if(user.isVerified) return res.status(400).json({ message: "User already verified" });

        if (Number(user.otp) !== Number(otp) || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP, please try again." })
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;

        //save to db
        await user.save();
        res.status(200).json({ message: "Email verified successfully" })


    } catch (error) {
        console.error(error)
    }
};
export const resendOtp = async(req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: "User not found" });

        //generate new otp
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; //10min
        await user.save();

        await sendEmail(email, "Resend OTP", `<h2>Your otp is: ${otp}</h2>`);

        res.json({ message: "OTP resent to email." });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }   
};
export const login = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select("+password");
        if(!user || !(await user.matchPassword(password))) 
            return res.status(400).json({ message: "Invalid Credentials..." });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const hashedRefreshToken = hashToken(refreshToken);
        //Single session 
        //refreshTokenS with (S) -> from Schema/DB
        user.refreshTokens = [hashedRefreshToken];
        await user.save();

        res.cookie("accessToken", accessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        res.json({
        user: {
            id: user._id,
            email: user.email,
            isVerified: user.isVerified,
        },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message});
    }
};
export const forgotPassword = async(req, res) => {
    const{ email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");
        
        user.passwordResetToken = hashedToken;
        user.passwordResetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.CLIENT_URL}/reset/${resetToken}`;

        await sendEmail(
            email,
            "Reset Password",
            `<a href="${resetUrl}">Reset your password</a>`
        );
        res.json({ msg: "Password reset link sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message:"Internal server error", error: error.message });
    }
};
export const resetPassword = async (req, res) => {
    try {
        const resetToken = req.params.token;

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        user.password = req.body.newPassword; 
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiry = undefined;

        await user.save();

        res.json({ message: "Password reset successful." });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};
export const logout = async (req, res) => {
    const token = req.cookies.refreshToken;
    try {
    if (token) {
      const hashedToken = hashToken(token);

      await User.updateOne(
        {refreshTokens: hashToken},
        { $pull: { refreshTokens: hashedToken } }
      );
    }
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions); 
    
    res.json({ message: "Logged out" });   
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
        success: false
      });
    }

    const userObj = user.toObject();

    delete userObj.password;

    res.status(200).json({
      success: true,
      user: userObj
    });

  } catch (error) {
    console.error("Error in checkAuth:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
