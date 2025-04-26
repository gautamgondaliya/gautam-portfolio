"use client";

import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.name && userInput.email && userInput.message) {
      setError(prev => ({ ...prev, required: false }));
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.name || !userInput.email || !userInput.message) {
      setError(prev => ({ ...prev, required: true }));
      return;
    } 
    
    if (error.email) {
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`, userInput);

      toast.success("Message sent successfully!");
      setUserInput({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field) => (e) => {
    setUserInput(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleEmailBlur = () => {
    checkRequired();
    setError(prev => ({ ...prev, email: !isValidEmail(userInput.email) }));
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">Contact with me</p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name:</label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required
              value={userInput.name}
              onChange={handleInputChange("name")}
              onBlur={checkRequired}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email:</label>
            <input
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required
              value={userInput.email}
              onChange={handleInputChange("email")}
              onBlur={handleEmailBlur}
            />
            {error.email && (
              <p className="text-sm text-red-400">Please provide a valid email!</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message:</label>
            <textarea
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] transition-all duration-300 px-3 py-2"
              maxLength="500"
              rows="4"
              required
              value={userInput.message}
              onChange={handleInputChange("message")}
              onBlur={checkRequired}
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            {error.required && (
              <p className="text-sm text-red-400">All fields are required!</p>
            )}
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 ease-out hover:text-white md:font-semibold"
              role="button"
              onClick={handleSendMail}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>Sending Message...</span>
              ) : (
                <span className="flex items-center gap-1">
                  Send Message
                  <TbMailForward size={20} />
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
