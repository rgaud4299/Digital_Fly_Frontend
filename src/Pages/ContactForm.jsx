
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { motion as Motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { postContactForm } from "../API/api";
import { useFadeInOnView } from "../utils/Animations/useFadeInOnView";
import { slideInLeft2 } from "../utils/Animations/animations";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    website: "",
    social: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { ref, ...motionText } = useFadeInOnView();

  const validate = () => {
    let newErrors = {};

    // Name - required & min 3 chars
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
  newErrors.phone = "Phone number must be exactly 10 digits";
}


    if (!formData.message.trim()) {
      newErrors.message = "Please describe your Project";
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Project description must be at least 20 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validate form fields
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix the highlighted errors");
      return;
    }

    setLoading(true);

    try {
      // 🔹 API Call
      const res = await postContactForm("/quote", formData);
      console.log("Response:", res);

      toast.success("Form submitted successfully!");

      // 🔹 Reset form
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        website: "",
        social: "",
        message: "",
      });
    } catch (err) {
      console.error("Error:", err.message || err);
      toast.error(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-page-bg to-page-bg bg-page-bg bg-gradient-to-t from-page-bg to-color-contact">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
        style={{
          backgroundImage: `url('https://digitalflyhigh.in/images/background/laew%20(3).jpg')`,
        }}
      ></div>
      <div className="absolute inset-0 opacity-50 z-0"></div>

      {/* Container */}
      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-white"
      >
        {/* Heading Animation */}
        <Motion.div className="text-center mb-10 max-w-3xl" {...motionText}>
          <p className="text-sky-400 font-medium text-sm">
            [ <span className="text-white"> Let's Connect </span> ]
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold mt-1">
            Ready to Start Your Project?
          </h2>
          <Motion.p
            variants={slideInLeft2(1)}
            className="mt-3 text-slate-300 text-sm md:text-base"
          >
            Tell us a little about your business and your goals. A member of our
            expert team will get back to you shortly to schedule your free,
            no-obligation consultation....
          </Motion.p>
        </Motion.div>

        {/* Form Animation */}
        <Motion.div
          className="w-full max-w-3xl bg-gradient-to-b from-[#00143C] to-[#011a4d] p-8 md:p-12 rounded-lg shadow-xl"
          {...motionText}
        >
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="border border-slate-600 bg-[#1B2347] w-full px-3 py-2 rounded-md text-white"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            {/* Business Name */}
            <div>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                className="border border-slate-600 bg-[#1B2347] w-full px-3 py-2 rounded-md text-white"
              />
              {errors.businessName && (
                <span className="text-red-500 text-sm">
                  {errors.businessName}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Business Email"
                className="border border-slate-600 bg-[#1B2347] w-full px-3 py-2 rounded-md text-white"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // Only digits
                  if (value.length <= 10) {
                    setFormData({ ...formData, phone: value });
                    setErrors({ ...errors, phone: "" });
                  }
                }}
                placeholder="Phone Number"
                className="border border-slate-600 bg-[#1B2347] w-full px-3 py-2 rounded-md text-white"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">{errors.phone}</span>
              )}
            </div>

            {/* Website */}
            <div>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="Your Website URL (Optional)"
                className="border border-slate-600 bg-[#1B2347] w-full px-3 py-2 rounded-md text-white"
              />
            </div>

            {/* Social */}
            <div>
              <input
                type="text"
                name="social"
                value={formData.social}
                onChange={handleChange}
                placeholder="Social Media Profile (Optional)"
                className="border border-slate-600 bg-[#1B2347] w-full px-3 py-2 rounded-md text-white"
              />
            </div>

            {/* message */}
            <div className="md:col-span-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                rows="2"
                className="border border-slate-600 bg-[#1B2347] w-full px-3 py-2 rounded-md text-white"
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center mt-4 flex justify-center ">
              {/* <button
                type="submit"
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-white px-6 py-2 rounded-md font-medium text-sm shadow-md"
              >
                {loading ? "Submitting..." : "GET MY FREE CONSULTATION"}   <span class="btn-ring"></span>
              </button> */}

              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 transition-colors text-white px-6 py-2 rounded-md font-medium text-sm shadow-md ${
                  loading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                
                {loading ? "Submitting..." : "GET MY FREE CONSULTATION"}
                {loading && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </form>
        </Motion.div>
      </div>
    </section>
  );
}
