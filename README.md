# Book App Project

🔗 **Live Demo:** [https://mern-booking-and-scheduling-system.onrender.com/login/)
<br>
A booking application built with the **MERN stack** that allows clients to book services and staff to manage and approve bookings. The app includes OTP email verification using **Resend**, booking notifications, and a calendar-based booking view.

---

## Features

### Staff View
- View all client bookings  
- Full calendar view of bookings  
- Receive booking notifications  
- Approve or decline bookings  

### Client View
- View personal bookings  
- See booking status (Pending, Approved, Declined)  
- Receive email notifications for booking status updates  
- OTP email verification during signup  

### Authentication
- User signup with OTP email verification  
- User login with JWT authentication  
- Forgot password via email  
- Reset password using secure token  
- OTP-based email verification using Resend  

---

## Tech Stack

### Frontend
- React.js  
- Zustand (state management)  
- React Router  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  

### Security, Email & Auth
- JWT  
- Crypto (Node.js) – secure token and hash generation  
- Resend – OTP, forgot password, reset password, and booking email notifications  

### Styling & Deployment
- Tailwind CSS / CSS Modules  
- Render

---

## Project Structure
backend/
├─ controllers/
├─ models/
├─ routes/
├─ utils/
frontend/
├─ components/
├─ pages/
├─ store/
├─ App.jsx
├─ index.jsx

---

## Environment Variables

Create a `.env` file inside the backend folder:


---

## Notes

- This project is **for learning and demonstration purposes only**.  
- The staff account is **not yet fully implemented in the schema** for proper approval handling.  
- In a production-ready system, staff accounts should manage **only their own client bookings**.  
- Email, OTP, forgot password, and reset password functionality using **Resend works only on the developer’s own verified domain**.  
- If you fork or clone this project, you must configure **your own Resend domain and API key** for email features to work.
  
---

## Future Improvements
- Proper role-based staff schema  
- Staff ownership of client bookings  
- Real-time notifications  
- Payment integration  
---



