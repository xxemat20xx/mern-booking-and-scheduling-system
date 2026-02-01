import express from 'express';
import {
 register,
 verify,
 resendOtp,
 login,
 forgetPassword,
 resetPassword
} from '../controller/auth.controller.js'

const router = express.Router();

router.post('/register', register);
router.get('/verify', verify);
router.get('/resend', resendOtp);
router.get('/login', login);
router.get('/forget', forgetPassword);
router.get('/reset', resetPassword);

export default router;