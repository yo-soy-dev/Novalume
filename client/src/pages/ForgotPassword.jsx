import React, { useState } from "react";
import api from "../configs/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetLink, setResetLink] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/users/forgot-password", { email });
      setResetLink(data.resetLink);
      toast.success("Reset link generated!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/90 backdrop-blur-md shadow-lg border border-gray-200 rounded-2xl p-8 text-center"
      >
        <h1 className="text-gray-900 text-2xl font-semibold mb-2">
          Forgot Password
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email to get a reset link
        </p>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="email"
            placeholder="Email address"
           className="border-none outline-none ring-0"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>  

        <button
          type="submit"
          className="mt-5 w-full h-11 rounded-full bg-green-500 text-white font-medium shadow-md hover:bg-green-600 active:scale-95 transition-transform"
        >
          Generate Reset Link
        </button>

        {resetLink && (
          <div className="mt-5 text-sm text-left">
            <p className="text-gray-600 mb-1">Reset link (copy & open):</p>
            <a
              href={resetLink}
              className="text-green-600 underline break-all hover:text-green-700"
            >
              {resetLink}
            </a>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
