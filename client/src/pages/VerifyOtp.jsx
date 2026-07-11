import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Plane, ArrowLeft } from "lucide-react";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);

  if (!email) {
    navigate("/register");
    return null;
  }

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedData) return;

    const newOtp = [...otp];

    pastedData.split("").forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      return toast.error("Please enter a valid OTP");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-otp`,
        {
          email,
          otp: enteredOtp,
        },
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);

        toast.success(response.data.message);

        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-white">
      <div className="w-full max-w-md">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 duration-300 mb-8"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="px-2">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
              <Plane size={26} className="text-purple-700 rotate-45" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-900">
            Verify OTP
          </h1>

          <p className="text-center text-gray-500 mt-3 text-sm">
            Enter the 6-digit verification code sent to
          </p>

          <p className="text-center text-purple-700 font-semibold text-sm mt-1">
            {email}
          </p>

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="flex justify-between gap-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-14 border border-gray-300 rounded-xl text-center text-xl font-semibold outline-none focus:border-purple-700"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-10 h-12 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold transition shadow-lg disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-8">
            Didn't receive the OTP?
          </p>

          <button
            type="button"
            className="w-full mt-3 border border-purple-700 text-purple-700 rounded-xl h-12 font-semibold hover:bg-purple-50 transition"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
