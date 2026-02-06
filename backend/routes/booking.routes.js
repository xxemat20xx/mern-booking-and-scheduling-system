import express from 'express';
import {
    getBooks,
    createBooking,
    deleteBooking,
    updateBooking
} from '../controller/booking.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.use(verifyToken);

router.get("/", getBooks);
router.post("/bookings", createBooking);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

export default router;