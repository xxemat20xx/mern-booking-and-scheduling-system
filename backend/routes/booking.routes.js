import express from 'express';
import {
    getBooks,
    createBooking,
    deleteBooking,
    updateBooking,
    confirmBooking,
    cancelBooking,
    getAllBookingsForStaff
} from '../controller/booking.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.use(verifyToken);

router.get("/", getBooks);
router.get("/staff", getAllBookingsForStaff); 
router.post("/bookings", createBooking);
router.put("/update/:id", updateBooking);
router.delete("/delete/:id", deleteBooking);
router.patch("/bookings/:id/confirm", confirmBooking);
router.patch("/bookings/:id/cancel", cancelBooking);


export default router;