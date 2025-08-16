import React, { useState } from "react";
import { toast } from "react-toastify";
import { postContactForm } from "../../API/api";

export default function JobApplicationModal({ isOpen, onClose, jobTitle }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});

  const initialFormState = {
    role: jobTitle,
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
    experience: "",
    skills: "",
    education: "",
    linkedin: "",
    expectedSalary: "",
    noticePeriod: "",
    coverLetter: "",
    cv: null,
  };
  const [formData, setFormData] = useState(initialFormState);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    const mobileRegex = /^\d{10}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else if (!mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber =
        "Mobile number must be 10 digits (numbers only).";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required.";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required.";
    if (!formData.education.trim())
      newErrors.education = "Education is required.";
    if (!formData.expectedSalary.trim())
      newErrors.expectedSalary = "Expected salary is required.";
    if (!formData.noticePeriod.trim())
      newErrors.noticePeriod = "Notice period is required.";
    if (!formData.coverLetter.trim())
      newErrors.coverLetter = "Cover letter is required.";

    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/i;
    if (!formData.linkedin.trim()) {
      newErrors.linkedin = "LinkedIn URL is required.";
    } else if (!linkedinRegex.test(formData.linkedin)) {
      newErrors.linkedin = "Enter a valid LinkedIn URL.";
    }

    if (!selectedFile) {
      newErrors.cv = "CV is required.";
    } else if (selectedFile.type !== "application/pdf") {
      newErrors.cv = "CV must be a PDF.";
    } else if (!selectedFile.type.includes("pdf")) {
      newErrors.cv = "CV must be a PDF.";
    } else if (selectedFile.size > 2 * 1024 * 1024) {
      newErrors.cv = "CV must be smaller than 2 MB.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleMobileNumberChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    handleInputChange("mobileNumber", digits);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      handleInputChange("cv", file);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "cv" && selectedFile) {
          payload.append("cv", selectedFile, selectedFile.name);
        } else {
          payload.append(key, String(value));
        }
      });

      const formDataObj = {};
      payload.forEach((value, key) => {
        formDataObj[key] = value;
      });

      const res = await postContactForm("/apply", payload, {
        "Content-Type": "multipart/form-data",
      });
      console.log("Response:", res);
      toast.success("Application submitted successfully!");
      
      setFormData(initialFormState);
      setSelectedFile(null);

      onClose();

    } catch (error) {
      toast.error("Application submitted failed!");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 hide-scrollbar ">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] overflow-y-auto shadow-2xl hide-scrollbar ">
        <div className="p-6 py-16 text-blue-500">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="w-full text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                Apply for <span className="text-blue-600">{jobTitle}</span>
              </h2>
              <p className="text-gray-600">
                {/* Fill in your details and upload your CV (PDF, max 2 MB). Fields marked * are required. */}
              </p>
            </div>
            <button
              onClick={() => !isSubmitting && onClose()}
              className="text-gray-400 hover:text-gray-600 text-xl font-bold w-8 h-8 flex items-center justify-center"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="space-y-1.5 ">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className={`w-full px-3 py-2  border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.mobileNumber}
                  onChange={handleMobileNumberChange}
                  placeholder="10 digits"
                  maxLength={10}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.mobileNumber ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.mobileNumber && (
                  <p className="text-xs text-red-500">{errors.mobileNumber}</p>
                )}
              </div>

              {/* Education */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Education <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  placeholder="e.g., B.Tech Computer Science"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.education ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.education && (
                  <p className="text-xs text-red-500">{errors.education}</p>
                )}
              </div>

              {/* LinkedIn URL */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  LinkedIn URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) =>
                    handleInputChange("linkedin", e.target.value)
                  }
                  placeholder="https://linkedin.com/in/your-profile"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.linkedin ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.linkedin && (
                  <p className="text-xs text-red-500">{errors.linkedin}</p>
                )}
              </div>

              {/* Fresher Checkbox */}
              {/* <div className="flex items-center gap-3 pt-5">
                <input
                  type="checkbox"
                  id="isFresher"
                  checked={formData.isFresher}
                  onChange={(e) =>
                    handleInputChange("isFresher", e.target.checked)
                  }
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isFresher" className="text-sm text-gray-700">
                  Are you a fresher?
                </label>
              </div> */}

              {/* Expected Salary */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Expected Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.expectedSalary}
                  onChange={(e) =>
                    handleInputChange("expectedSalary", e.target.value)
                  }
                  placeholder="e.g., 6 LPA"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.expectedSalary ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.expectedSalary && (
                  <p className="text-xs text-red-500">
                    {errors.expectedSalary}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Experience (If Fresher Fill 0)
                  <span className="text-red-500">* </span>
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  placeholder="e.g., 3 years as Frontend Dev"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.experience ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.experience && (
                  <p className="text-xs text-red-500">{errors.experience}</p>
                )}
              </div>

              {/* Notice Period */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Notice Period <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.noticePeriod}
                  onChange={(e) =>
                    handleInputChange("noticePeriod", e.target.value)
                  }
                  placeholder="e.g., Immediate / 30 days"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.noticePeriod ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.noticePeriod && (
                  <p className="text-xs text-red-500">{errors.noticePeriod}</p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-xs text-red-500">{errors.address}</p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Skills <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => handleInputChange("skills", e.target.value)}
                placeholder="Comma separated, e.g., React, Node, Tailwind"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.skills ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.skills && (
                <p className="text-xs text-red-500">{errors.skills}</p>
              )}
            </div>

            {/* Cover Letter */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">
                Cover Letter <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) =>
                  handleInputChange("coverLetter", e.target.value)
                }
                placeholder="Write a short cover letter..."
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                  errors.coverLetter ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.coverLetter && (
                <p className="text-xs text-red-500">{errors.coverLetter}</p>
              )}
            </div>

            {/* File Upload and Submit */}
            <div className="flex   md:items-center md:gap-2">
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  Upload CV (PDF, max 2 MB){" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <span className="inline-block px-4 py-2 rounded-md border border-gray-300 bg-gray-50 text-sm hover:bg-gray-100 transition-colors">
                      Choose file
                    </span>
                  </label>
                  <span className="text-sm text-gray-500">
                    {selectedFile ? selectedFile.name : "No file chosen"}
                  </span>
                </div>
                {errors.cv && (
                  <p className="text-xs text-red-500 mt-2">{errors.cv}</p>
                )}
              </div>
            </div>

            {/* Submit button */}
            <div className="flex flex-col  md:items-center md:gap-6">
              <div className="mt-3 md:mt-0 md:w-56">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-md text-white font-medium transition-colors ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
