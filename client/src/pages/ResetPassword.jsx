import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../configs/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/users/reset-password", { token, newPassword });
      toast.success("Password reset successful!");
      navigate("/"); // go to login
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid or expired link");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="sm:w-[350px] w-full border rounded-2xl px-8 bg-white text-center">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Reset Password</h1>
        <p className="text-gray-500 text-sm mt-2">Enter your new password below</p>
        <div className="flex items-center w-full mt-6 border h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="password"
            placeholder="New Password"
            className="border-none outline-none ring-0 w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="mt-4 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity">
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
