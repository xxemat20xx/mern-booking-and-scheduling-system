// models/Booking.js
import mongoose from "mongoose";
import { format } from "date-fns";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  clientSnapshot: {       
    id: String,
    name: String,
    email: String,
  },
  serviceId: { type: String, required: true },       // Reference to service
  staffId: { type: String, required: true },         // Reference to staff
  title: { type: String, required: true },           
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "declined"],
    default: "pending",
  },
  notes: { type: String, default: "" },

  // Snapshots to keep a record of service & staff info at booking time
  serviceSnapshot: {
    id: String,
    name: String,
    price: Number,
    duration: Number,
    category: String,
  },
  staffSnapshot: {
    id: String,
    name: String,
    role: String,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.start = format(ret.start, "MM/dd/yyyy HH:mm");
      ret.end = format(ret.end, "MM/dd/yyyy HH:mm");
      ret.createdAt = format(ret.createdAt, "MM/dd/yyyy");
      ret.updatedAt = format(ret.updatedAt, "MM/dd/yyyy");
      return ret;
    },
  },
});

export default mongoose.model("Booking", bookingSchema);
