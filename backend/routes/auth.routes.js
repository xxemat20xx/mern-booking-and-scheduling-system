import express from 'express';
import {
 register,
 verify,
 resendOtp,
 login,
 forgotPassword,
 resetPassword,
 logout,
 checkAuth
} from '../controller/auth.controller.js'
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify', verify);
router.post('/resend', resendOtp);
router.post('/login', login);
router.post('/forgot', forgotPassword);
router.put('/reset/:token', resetPassword);
router.post('/logout', logout);

// protected
router.get('/check-auth', verifyToken, checkAuth);

export default router;