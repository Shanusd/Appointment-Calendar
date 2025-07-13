import { useState } from "react";
import Login from "./components/Login.jsx";
import Calendar from "./components/Calendar.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? <Calendar /> : <Login login={() => setIsLoggedIn(true)} />}
        <ToastContainer/>
    </>
  );
};

export default App;

