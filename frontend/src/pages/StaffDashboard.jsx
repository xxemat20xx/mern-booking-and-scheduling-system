import React, { useState, useEffect, act } from 'react';
import { SERVICES, STAFF, TIME_SLOTS } from "../constants/data";
import { Trash2, CheckCircle, Mail, AlertCircle, TrendingUp, Users, Calendar as CalendarIcon, XCircle, Clock } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useBookStore } from '../store/useBookStore';
import { useAuthStore } from '../store/useAuthStore';
import { parse } from 'date-fns';


const StatusBadge = ({status}) => {
  const styles = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    declined: 'bg-rose-100 text-rose-700 border-rose-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles[status]}`}>
      {status}
    </span>
  );
};

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { fetchStaffBookings, bookings, confirmBooking, cancelBooking } = useBookStore();
  const { user, isCheckingAuth  } = useAuthStore();

    useEffect(() => {
      // Only fetch when a staff logs in
      if (user?.role === 'staff') {
        fetchStaffBookings();
      } else {
        // Clear bookings if not staff
        useBookStore.setState({ bookings: [] });
      }
}, [user, fetchStaffBookings]);


  if (isCheckingAuth) return <div>Loading staff dashboard...</div>;
  if (!user) return null;

  const approvedRevenue = bookings
  .filter(b => b.status === 'approved' || b.status ==='completed')
  .reduce((acc, b) => acc + (SERVICES.find(s => s.id === b.serviceId)?.price || 0), 0);
  
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Estimated Revenue', value: `$${approvedRevenue}`, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Action Required', value: pendingCount, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const calendarEvents = bookings
    .filter(b => b.status !== 'declined')
    .map(b => {
      const service = SERVICES.find(s => s.id === b.serviceId);

      const startDate = parse(b.start, "MM/dd/yyyy HH:mm", new Date());
      const endDate = parse(b.end, "MM/dd/yyyy HH:mm", new Date());

      return {
        id: b._id,
        title: `${service?.name} (${b.clientSnapshot?.name})`,
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        color: b.status === 'confirmed' ? '#10b981' : b.status === 'pending' ? '#f59e0b' : '#4f46e5',
        extendedProps: { ...b }
      };
    });

  console.log(calendarEvents)
  const handleAction = async(bookingId, action) => {
    if(action === 'confirmed') {
      await confirmBooking(bookingId);
    }
    if(action === 'declined'){
      await cancelBooking(bookingId)
    }
     fetchStaffBookings(); 
  };
  const handleDelete = () => {};
return (
  <div className="space-y-8 animate-in fade-in duration-500">
    {user.role?.toLowerCase() === 'staff' && (
     <>
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Staff Portal</h1>
          <p className="text-slate-500">Review requests and manage your schedule.</p>
        </div>
        <div className="flex gap-2">
          {['overview', 'calendar', 'notifications'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      {/* ------------------ OVERVIEW --------------------------- */}
      {activeTab === 'overview' && (
      <div className="space-y-8">
            {/* GRID */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((s, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className={`${s.bg} ${s.color} p-3 rounded-xl`}>
                    <s.icon size={24} />
                    </div>
                    <div>
                    <p className="text-sm font-medium text-slate-500">{s.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                    </div>
                </div>
                ))}               
             </div>

             {/* All Bookings List */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-bold text-lg">Booking Approval Queue</h3>
                        <div className="flex gap-2">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div> {pendingCount} Pending
                            </span>
                        </div>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {bookings.length === 0 ? 
                        (
                          <div className="p-12 text-center text-slate-400">
                            <CalendarIcon size={48} className="mx-auto mb-4 opacity-20" />
                            <p>No bookings in the system yet.</p>
                         </div>
                        ) : 
                        (
                bookings.sort((a) => a.status === 'pending' ? -1 : 1).map((booking) => {
                  const service = SERVICES.find(s => s.id === booking.serviceId);
                  const staff = STAFF.find(s => s.id === booking.staffId);
                  return (
                    <div key={booking._id} className="p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-500 leading-none">
                          <span className="text-[10px] font-bold uppercase">{new Date(booking.start).toLocaleDateString(undefined, { month: 'short' })}</span>
                          <span className="text-lg font-black">{new Date(booking.start).getDate()}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900">{booking.clientName}</h4>
                            <StatusBadge status={booking.status} />
                          </div>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            {service?.name} with {staff?.name} at {booking.startTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {booking.status === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleAction(booking._id, 'confirmed')}
                              className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-sm font-bold border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2"
                            >
                              <CheckCircle size={16} /> Confirm
                            </button>
                            <button 
                              onClick={() => handleAction(booking._id, 'declined')}
                              className="px-4 py-2 bg-rose-50 text-rose-600 rounded-lg text-sm font-bold border border-rose-100 hover:bg-rose-600 hover:text-white transition-all flex items-center gap-2"
                            >
                              <XCircle size={16} /> Decline
                            </button>
                          </>
                        )}
                        {booking.status === 'approved' && (
                           <button 
                              onClick={() => handleAction(booking, 'completed')}
                              className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold border border-indigo-100 hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
                            >
                              <CheckCircle size={16} /> Complete
                            </button>
                        )}
                        <button 
                          onClick={() => handleDelete(booking.id)}
                          className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
                    </div>
              </div>
      </div>
    )}
    {/* ------------------ CALENDAR --------------------------- */}
    {activeTab === 'calendar' && (
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[600px]">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
              headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={calendarEvents} 
            height="auto"
            slotMinTime="08:00:00"
            slotMaxTime="20:00:00"
            allDaySlot={false}
          />
      </div>
    )}
     </>
    )}
  </div>
);
}
export default StaffDashboard