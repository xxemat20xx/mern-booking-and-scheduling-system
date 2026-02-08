import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    }
    ,
    role: {
        type: String,
        enum: ['client', 'staff', 'admin'],
        default: 'client'
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    refreshTokens: [String],
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: String,
    otpExpiry: Date,

    passwordResetOtp: String,
    passwordResetOtpExpiry: Date,

    passwordResetToken: String,
    passwordResetTokenExpiry: Date,
    
},{timestamps: true});

// ✅ Pre-save hook
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ✅ Compare password method
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);