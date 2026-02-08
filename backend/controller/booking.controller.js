import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';
import { sendEmail } from '../utils/email.js';
import { SERVICES, STAFF } from "../constants.js";
export const getBooks = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId }).sort({ start: 1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const createBooking = async (req, res) => {
  const {
    serviceId,
    staffId,
    date,
    startTime,
    notes = "",
  } = req.body;

  // 🔒 Validate required input from frontend
  if (!serviceId || !staffId || !date || !startTime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // ✅ Authenticated user
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Resolve service & staff from constants
    const service = SERVICES.find(s => s.id === serviceId);
    const staff = STAFF.find(s => s.id === staffId);

    if (!service || !staff) {
      return res.status(400).json({ message: "Invalid service or staff" });
    }

    // 🕒 Build real Date objects
    const start = new Date(`${date}T${startTime}:00`);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + service.duration);

    // ⚠️ Conflict check (same staff, overlapping time)
    const conflict = await Booking.findOne({
      staffId,
      start: { $lt: end },
      end: { $gt: start },
      status: "confirmed",
    });

    if (conflict) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    // 📝 Create booking (schema-aligned)
    const booking = await Booking.create({
      userId: user._id,
      serviceId,
      staffId,
      title: service.name,
      start,
      end,
      notes,

      serviceSnapshot: {
        id: service.id,
        name: service.name,
        price: service.price,
        duration: service.duration,
        category: service.category,
      },

      staffSnapshot: {
        id: staff.id,
        name: staff.name,
        role: staff.role,
      },
    });

    // 📧 Email confirmation
    try {
      await sendEmail(
        user.email,
        "Booking Pending",
        `
          <h2>Booking Pending</h2>
          <p><strong>${service.name}</strong></p>
          <p>With ${staff.name}</p>
          <p>${start.toLocaleString()} – ${end.toLocaleString()}</p>
        `
      );
    } catch (err) {
      console.error("Email failed, booking still created");
    }

    res.status(201).json(booking);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const updateBooking = async(req,res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(400).json({ message: "Booking not found" });
    if(booking.userId.toString() !== req.userId.toString()) return res.status(403).json({ message:"Not authorized" });

    Object.assign(booking, req.body);
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteBooking = async(req,res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if(!booking) return res.status(400).json({ message: "Booking not found" });
    if(booking.userId.toString() !== req.userId.toString()) return res.status(403).json({ message:"Not authorized" });

    await booking.deleteOne();

    res.status(200).json({ message: "Booking deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
