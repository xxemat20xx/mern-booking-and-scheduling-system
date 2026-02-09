import { useAuthStore } from "../store/useAuthStore"
import { useBookStore } from "../store/useBookStore";
import { useEffect, useState } from "react";
import { SERVICES, STAFF, TIME_SLOTS } from "../constants/data";


// icons
import { 
  Sparkles, 
  User, 
  Clock, 
  Mail,
  History,
  Check,
  ChevronRight,
  CalendarIcon } from 'lucide-react';

const StatusBadge = ({status}) => {
  const styles = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    declined: 'bg-rose-100 text-rose-700 border-rose-200',
  }
  return(
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles[status]}`}>
      {status}
    </span>   
  )
}

const Dashboard = () => {
  const { user } = useAuthStore();
  const { fetchBookings, bookings, createBooking } = useBookStore();

  useEffect(() => {
    fetchBookings();
  },[fetchBookings])


  const [view, setView] = useState('book');
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    {id:1, label: 'Service', icon: Sparkles},
    {id:2, label: 'Specialist', icon: User},
    {id:3, label: 'Time', icon: Clock},
    {id:4, label: 'Confirm', icon: Mail}
  ];
  const resetFlow = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedStaff(null);
    setSelectedDate('');
    setSelectedTime('');
    setNotes('');
  };
  const handleComplete = async () => {
    setIsSubmitting(true);
    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime) return;

    const bookingPayload = {
      clientSnapshot: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      serviceId: selectedService.id,
      staffId: selectedStaff.id,
      date: selectedDate,
      startTime: selectedTime,
      endTime: '', 
      status: 'pending',
      notes: notes,
    };

    try {
      await createBooking(bookingPayload);
      resetFlow();
      setView('history'); 
      setIsSubmitting(false);

    } catch (err) {
      console.error(err);
    }
  };
  const isSlotBooked = () => {} // helper to show if book is not avail
  
return (
  <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
    {user?.role === 'client' && (
      <div className="flex flex-col items-center mb-8">
        <div className="bg-white border border-slate-200 p-1 rounded-xl shadow-sm flex mb-4">
          <button 
            onClick={() => setView('book')}
            className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${view === 'book' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <CalendarIcon size={16} /> Book New
          </button>
          <button 
            onClick={() => setView('history')}
            className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${view === 'history' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <History size={16} /> My Schedule
          </button>     
        </div>

        {/* Conditional rendering for view */}
        {view === 'book' ? (
          <div className="w-full">
            <div className="mb-12 flex justify-between items-center relative px-4">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
              {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    step >= s.id ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-400'
                  }`}>
                    {step > s.id ? <Check size={20} /> : s.icon ? <s.icon size={20} /> : null}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${step >= s.id ? 'text-indigo-600' : 'text-slate-400'}`}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* --------------CHOOSE SERVICES STEP 1-------------- */}
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
              {step === 1 && (
                <div className="p-8 animate-in fade-in duration-500">
                  <h2 className="text-2xl font-bold mb-6">Choose a Service</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SERVICES.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => { setSelectedService(service); setStep(2); }}
                      className="flex flex-col p-6 rounded-xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50/30 transition-all text-left group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold uppercase text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600">
                          {service.category}
                        </span>
                        <span className="font-bold text-lg">${service.price}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600">{service.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{service.description}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <Clock size={14} /> {service.duration} mins
                      </div>
                    </button>
                  ))}
                </div>
                </div>
              )}
              {/* --------------CHOOSE SPECIALIST STEP 2-------------- */}
            {step === 2 && (
              <div className="p-8 animate-in slide-in-from-right duration-500">
                <h2 className="text-2xl font-bold mb-6">Select a Specialist</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {STAFF.filter(s => s.specialties.includes(selectedService?.id || '')).map((staff) => (
                    <button
                      key={staff.id}
                      onClick={() => { setSelectedStaff(staff); setStep(3); }}
                      className="p-6 rounded-xl border-2 border-slate-100 hover:border-indigo-600 transition-all text-center group"
                    >
                      <img src={staff.avatar} alt={staff.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-slate-50 group-hover:border-indigo-200" />
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600">{staff.name}</h3>
                      <p className="text-sm text-slate-500">{staff.role}</p>
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} className="mt-8 text-slate-400 hover:text-indigo-600 text-sm font-medium">← Back to services</button>
              </div>
            )}
            {/* --------------CHOOSE DATE AND TIME STEP 3-------------- */}
            {step === 3 && (
                          <div className="p-8 animate-in slide-in-from-right duration-500">
                <h2 className="text-2xl font-bold mb-6">Choose Date & Time</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Select Date</label>
                    <input 
                      type="date" 
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                  {selectedDate && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Available Slots</label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {TIME_SLOTS.map(time => {
                          const booked = isSlotBooked(selectedDate, time, selectedStaff?.id || '');
                          return (
                            <button
                              key={time}
                              disabled={booked}
                              onClick={() => setSelectedTime(time)}
                              className={`p-2.5 rounded-lg text-sm font-semibold border transition-all ${
                                booked 
                                  ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                                  : selectedTime === time 
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-600'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-8 flex justify-between items-center">
                          <button onClick={() => setStep(2)} className="text-slate-400 hover:text-indigo-600 text-sm font-medium">← Back to specialists</button>
                          <button 
                            disabled={!selectedDate || !selectedTime}
                            onClick={() => setStep(4)}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
                          >
                            Continue <ChevronRight size={18} />
                          </button>                     
                      </div>
                    </div>
                  )}              
                </div>
            </div>
            )}
            {/* --------------CONFIRMATION STEP 4-------------- */}
            {step === 4 && (
              <div className="p-8 animate-in slide-in-from-right duration-500">
                <h2 className="text-2xl font-bold mb-6">Final Confirmation</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <h4 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-widest">Booking Summary</h4>
                        <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Service</span>
                          <span className="font-bold">{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Specialist</span>
                          <span className="font-bold">{selectedStaff?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Date</span>
                          <span className="font-bold">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Time</span>
                          <span className="font-bold">{selectedTime}</span>
                        </div>
                        <div className="pt-4 mt-2 border-t border-slate-200 flex justify-between items-center">
                          <span className="font-bold text-slate-900">Total</span>
                          <span className="text-2xl font-black text-indigo-600">${selectedService?.price}</span>
                        </div>                 
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <h4 className="text-xs font-bold uppercase text-indigo-600 mb-1">Authenticated As</h4>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">Additional Notes</label>
                          <textarea 
                            className="w-full p-4 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none transition-all" 
                            placeholder="Any medical conditions or special preferences we should know about?"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                          />
                      </div>
                    </div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                    <button onClick={() => setStep(3)} className="text-slate-400 hover:text-indigo-600 text-sm font-medium">← Back</button>
                    <button 
                      disabled={isSubmitting}
                      onClick={handleComplete}
                      className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 shadow-xl shadow-indigo-100 transition-all flex items-center gap-3"
                    >
                        {isSubmitting ? 'Requesting...' : 'Confirm Request'} <Sparkles size={18} />
                    </button>
                </div>
              </div>
            )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden animate-in fade-in duration-500">
            <div className="p-8 border-b border-slate-100">
              <h2 className="text-2xl font-bold">My Schedule</h2>
              <p className="text-slate-500">Track and manage your upcoming appointments.</p>
            </div>
             <div className="divide-y divide-slate-50">
                {bookings.map((booking) => {
                  const service = SERVICES.find(s => s.id === booking.serviceId);
                  const staff = STAFF.find(s => s.id === booking.staffId);
                return (
                  <div key={booking._id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                        <CalendarIcon size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900">{service?.name}</h4>
                          <StatusBadge status={booking.status} />
                        </div>
                        <p className="text-sm text-slate-500">with {staff?.name} • {new Date(booking.start).toLocaleDateString()} at {booking.startTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-black text-slate-900">${service?.price}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{service?.duration} mins</p>
                      </div>
                    </div>
                  </div>
                );
                })}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);
}
export default Dashboard