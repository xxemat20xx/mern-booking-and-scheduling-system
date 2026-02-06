import mongoose from 'mongoose';
import { format } from 'date-fns';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },   
},
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      // Format dates for API output
      ret.start = format(ret.start, 'MM/dd/yyyy');
      ret.end = format(ret.end, 'MM/dd/yyyy');
      ret.createdAt = format(ret.createdAt, 'MM/dd/yyyy');
      ret.updatedAt = format(ret.updatedAt, 'MM/dd/yyyy');
      return ret;
    }
  }
});

export default mongoose.model('Booking', bookingSchema);
