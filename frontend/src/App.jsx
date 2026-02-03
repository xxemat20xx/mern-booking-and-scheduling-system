
//toastify
import { ToastContainer } from "react-toastify";

//pages
import Register from "./pages/Register"

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      <Register />
    </>
    
  )
}

export default App