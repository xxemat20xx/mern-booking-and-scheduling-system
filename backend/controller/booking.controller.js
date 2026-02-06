import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';
import { sendEmail } from '../utils/email.js';

export const getBooks = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.userId }).sort({ start: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async(req,res) => {};
export const deleteBooking = async(req,res) => {};
export const createBooking = async (req, res) => {
    const { title, start, end } = req.body;
    if(!title || !start || !end){
        return res.status(400).json({ message: "Missing fields" });
    }
    try {
        //fetch user from db using req.userId
        const user = await User.findById(req.userId)
        if (!user) return res.status(404).json({ message: "User not found" });

        const conflict = await Booking.findOne({
        start: { $lt: end },
        end: { $gt: start },
        status: "confirmed",
        });

        if (conflict) return res.status(409).json({ message: "Time slot already booked" });

        // Create the booking
        const booking = await Booking.create({
        user: req.userId,
        title,
        start,
        end,
        });
        // send email
        try {
        await sendEmail(
            user.email,
            "Booking Confirmed",
            `<h2>Booking Confirmed</h2>
            <p><strong>${title}</strong></p>
            <p>${new Date(start).toLocaleString()} – ${new Date(end).toLocaleString()}</p>`
        );
        } catch (err) {
        console.error("Email failed, booking still created");
        }
         res.status(201).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });        
    }
}

/*
import Booking from "../models/Booking.js";

// GET /api/bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    }).sort({ start: 1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/bookings
export const createBooking = async (req, res) => {
  const { title, start, end } = req.body;

  if (!title || !start || !end) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    // overlap check (important for booking apps)
    const conflict = await Booking.findOne({
      start: { $lt: end },
      end: { $gt: start },
      status: "confirmed",
    });

    if (conflict) {
      return res
        .status(409)
        .json({ message: "Time slot already booked" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      title,
      start,
      end,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/bookings/:id
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(booking, req.body);
    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/bookings/:id
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await booking.deleteOne();

    res.status(200).json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


*/