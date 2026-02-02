import express from 'express';
import {
 register,
 verify,
 resendOtp,
 login,
 forgotPassword,
 resetPassword,
 logout
} from '../controller/auth.controller.js'

const router = express.Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/resend', resendOtp);
router.post('/login', login);
router.post('/forgot', forgotPassword);
router.post('/reset/:token', resetPassword);
router.post('/logout', logout);

export default router;