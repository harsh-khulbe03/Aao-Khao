import { useNavigate } from "react-router-dom";
import React, {useState} from "react";
import { useToastContext } from "../context/ToastContext";

const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {showToast} = useToastContext();

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers:{
          "Content-Type":"application/json",
        }
      });

      if (res.ok) {
        const data = await res.json();
        const token = data?.token;
        if (token) {
          localStorage.setItem("token", token);
          showToast("bg-green-500","Login Successful...");
          navigate("/");
        } else {
          console.log("No token provided");
        }
      } else {
        const error = await res.json();
        console.log("error");
        showToast("bg-red-400",error.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form
        className="h-1/3 w-1/3 mx-auto mt-40 mb-60 p-10 bg-white flex flex-col gap-12 rounded-2xl border border-1 border-black"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-black text-center text-orange-400">Login</h1>
        <div className="flex flex-col justify-around gap-10">
          <div className="flex">
            <input
              type="text"
              className="px-16 py-2 outline-none rounded-md border border-1 border-black"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter you Email"
              value={email}
            />
          </div>
          <div className="flex">
            <input
              type="text"
              className="px-16 py-2 outline-none rounded-md border border-1 border-black"
              onChange={(e) =>   setPassword(e.target.value)}
              placeholder="Enter your Password"
              value={password}  
            />
          </div>

          <button
            className="px-10 py-2 text-xl font-black bg-orange-400 text-white rounded-lg"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
