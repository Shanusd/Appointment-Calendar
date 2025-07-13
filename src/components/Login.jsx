import { useState } from "react";
import loginImg from "../assets/image.svg";
import { toast } from "react-toastify";
const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "staff@clinic.com" && password === "123456") {
      login();
      toast.success('Login successfully',{position:'top-right'})
    } else { 
      toast.error('invalid credentials',{position:'top-left'})
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
  <div className="flex w-[60%] max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-50 p-8">
      <img src={loginImg} alt="login" className="w-full max-w-md" />
    </div>
    <div className="w-full md:w-1/2 flex items-center justify-center p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-6"
      >
        
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            🩺
          </div>
          <h2 className="text-2xl font-semibold text-blue-600">
            Welcome back
          </h2>
        </div>
        <input
          type="email"
          placeholder="Username"
          className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-b border-gray-300 p-2 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        > LOGIN
        </button>
      </form>
    </div>
  </div>
</div>
  );
};
export default Login;
