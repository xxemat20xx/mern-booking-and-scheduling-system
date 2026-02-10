import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';
import { sendEmail } from '../utils/email.js';
import { SERVICES, STAFF } from "../constants.js";
import { bookingPendingEmailTemplate, confirmedBookingTemplate } from '../utils/emailTemplate.js'

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

  // Validate required input
  if (!serviceId || !staffId || !date || !startTime) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Authenticated user
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Resolve service & staff
    const service = SERVICES.find(s => s.id === serviceId);
    const staff = STAFF.find(s => s.id === staffId);

    if (!service || !staff) {
      return res.status(400).json({ message: "Invalid service or staff" });
    }

    // Build Date objects
    const start = new Date(`${date}T${startTime}:00`);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + service.duration);

    // Conflict check
    const conflict = await Booking.findOne({
      staffId,
      start: { $lt: end },
      end: { $gt: start },
      status: "confirmed",
    });

    if (conflict) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    // Create booking
    const booking = await Booking.create({
      userId: user._id,
      clientSnapshot: {               // <<< ADD THIS
        id: user._id,
        name: user.name,
        email: user.email,
      },
      serviceId,
      staffId,
      title: service.name,
      start,
      end,
      notes,
      notifications: [
        {
          type: "created",
          message: `New booking request from ${user.name}`,
        },
      ],
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
    
    // Email confirmation
    const serviceName = service.name;
    const staffName = staff.name;
    try {
      await sendEmail(
        user.email,
        "Booking Pending",
        bookingPendingEmailTemplate({serviceName, staffName, start, end})
      );
    } catch (err) {
      console.error("Email failed, booking still created");
    }

    res.status(201).json(booking);

  } catch (error) {
    
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
export const confirmBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    if (booking.status !== "pending") {
      return res.status(400).json({ message: "Booking cannot be confirmed" });
    }
    
    booking.status = "confirmed";

    // ✅ Add notification
    booking.notifications.push({
      type: "confirmed",
      message: `Booking confirmed for ${booking.serviceSnapshot?.name}`,
    });


    await booking.save();

    // Get user from snapshot (recommended)
    const userEmail =
      booking.clientSnapshot?.email ||
      (await User.findById(booking.userId))?.email;

    const userName = booking.clientSnapshot?.name;

    const serviceName = booking.serviceSnapshot?.name;
    const staffName = booking.staffSnapshot?.name;

    const start = booking.start;
    const end = booking.end;

    if(userEmail){
      try {
        await sendEmail(
          userEmail,
          "✅ Booking Confirmed",
         confirmedBookingTemplate({
          name: userName,
          serviceName,
          staffName,
          start: start.toLocaleString(),
          end: end.toLocaleString(),
        })

        )
      } catch (error) {
          console.error("Email failed:", error);
      }
    }
  

    res.status(200).json(booking);
 

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // if (booking.userId.toString() !== req.userId.toString()) {
    //   return res.status(403).json({ message: "Not authorized" });
    // }

    if (booking.status === "declined") {
      return res.status(400).json({ message: "Booking already cancelled" });
    }

    booking.status = "declined";
    // ✅ Add notification
    booking.notifications.push({
      type: "declined",
      message: `Booking confirmed for ${booking.serviceSnapshot?.name}`,
    });

    await booking.save();

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get all bookings (no filter)
export const getAllBookingsForStaff = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ start: 1 }); // all bookings
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


