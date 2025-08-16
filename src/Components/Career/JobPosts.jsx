import React, { useState } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaRegClock,
  FaInfoCircle,
  FaRocket,
} from "react-icons/fa";
import "./filp.css";
import JobApplicationModal from "./JobApplicationModal";


const sampleJobs = [
  {
    id: 1,
    jobId: "DFH-MEAN-001",
    company: "Digital Fly High",
    logo: "", 
    location: "Indore, India",
    category: "Software",
    title: "MEAN Stack Developer",
    type: "Full time",
    posted: "Before 11 Months",
    salary: "Fair compensation",
    salaryMin: 25000,
    salaryMax: 40000,
    period: "Per Month",
    description: "MEAN Stack Developer.",
    skills: [
      "MongoDB",
      "NodeJs",
      "Angular",
      "ExpressJs",
      "JavaScript",
      "TypeScript",
    ],
    applicationDeadline: "2025-09-30",
    experienceLevel: "Mid-level",
    languagesRequired: ["English", "Hindi"],
    responsibilities: [
      "Develop and maintain MEAN stack applications",
      "Collaborate with cross-functional teams",
      "Ensure high-quality, scalable code",
    ],
    workSchedule: "Day shift, Monday to Friday",
    educationRequirement:
      "Bachelor’s degree in Computer Science or related field",
  },
  {
    id: 2,
    jobId: "DFH-GD-002",
    company: "Digital Fly High",
    logo: "",
    location: "Indore, India",
    category: "Software",
    title: "Graphic Designer",
    type: "Full time",
    posted: "Before 8 Months",
    salary: "Negotiable remuneration",
    salaryMin: 300000,
    salaryMax: 500000,
    period: "Per Year",
    description:
      "Job Title: Graphic (UI/UX) Designer Location: Indore (M.P.) Experience: 2+ years experts can apply...",
    skills: ["Figma", "Photoshop", "Adobe Illustrator", "UI/UX"],
    applicationDeadline: "2025-10-15",
    experienceLevel: "Senior",
    languagesRequired: ["English", "Hindi"],
    responsibilities: [
      "Create engaging UI/UX designs",
      "Collaborate with developers to ensure design feasibility",
      "Maintain brand consistency",
    ],
    workSchedule: "Flexible hours, Monday to Saturday",
    educationRequirement:
      "Bachelor’s degree in Design, Fine Arts, or related field",
  },
  {
    id: 3,
    jobId: "DFH-DME-003",
    company: "Digital Fly High",
    logo: "",
    location: "Indore, India",
    category: "Software",
    title: "Digital Marketing Executive",
    type: "Full time",
    posted: "Before 3 Months",
    salary: "As per industry standards",
    salaryMin: 20000,
    salaryMax: 35000,
    period: "Per Month",
    description:
      "We are seeking an experienced SEO Specialist to join our digital marketing team. The ideal candidate will be...",
    skills: ["SEO", "Google Analytics", "Google Ads", "Off Page SEO"],
    applicationDeadline: "2025-08-31",
    experienceLevel: "Mid-level",
    languagesRequired: ["English", "Hindi"],
    responsibilities: [
      "Plan and execute SEO campaigns",
      "Analyze web traffic and performance metrics",
      "Coordinate with content and design teams",
    ],
    workSchedule: "Day shift, Monday to Friday",
    educationRequirement: "MCA/B.Tech",
  },
];
const JobCard = ({ job }) => {

     const [selectedJob, setSelectedJob] = useState(null);
   const [isModalOpen, setIsModalOpen] = useState(false);
 
   
 
   const closeModal = () => {
     setIsModalOpen(false);
     setSelectedJob(null);
   };
    const handleApply = (job) => {
     setSelectedJob(job);
     setIsModalOpen(true);
   };

  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div className=" py-10">
      <div className={`flip-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-front ">
          <article
            className="bg-white rounded-2xl p-8 flex flex-col justify-between card-accent9 min-h-[520px] transform transition-all hover:-translate-y-3 hover:shadow-2xl"
            aria-labelledby={`job-${job.id}-title`}
          >
            <div>
              {/* header: company + location */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* logo placeholder */}
                  <div className="w-20 h-20 rounded-full  flex items-center justify-center">
                    {/* if logo url exists, replace with <img src={job.logo} /> */}
                    <span className="text-sm font-semibold text-gray-600">
                      <img src="https://digitalflyhigh.in/images/logo.svg" />
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {job.company}
                    </h4>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <FaMapMarkerAlt className="inline-block text-gray-400" />{" "}
                      {job.location}
                    </p>
                  </div>
                </div>

                {/* small corner number or logo can go here */}
                <div className="text-sm text-gray-200"> </div>
              </div>

              {/* category */}
              <p className="text-orange-500 font-semibold mt-5">
                {job.category}
              </p>

              {/* title */}
              <h3
                id={`job-${job.id}-title`}
                className="mt-2 text-2xl font-bold text-gray-900 leading-tight"
              >
                {job.title}
              </h3>

              {/* meta: type & posted */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                <span className="flex items-center gap-2">
                  <FaBriefcase className="text-gray-400" />{" "}
                  <span>{job.type}</span>
                </span>
                <span className="flex items-center gap-2">
                  <FaRegClock className="text-black-900" /> Posted :{" "}
                  <span className="text-gray-400">{job.posted}</span>
                </span>
              </div>

              {/* salary */}
              <div className="mt-5">
                <p className="text-gray-800 font-semibold text-sm py-1">
                  Qulification : <span className="font-bold"></span>
                  <span className="text-sm text-gray-500">
                    {job.educationRequirement}
                  </span>
                </p>

                <p className="text-gray-800 font-semibold text-sm py-1">
                  Job Title : <span className="font-bold"></span>
                  <span className="text-sm text-gray-500">
                    {job.description}
                  </span>
                </p>
                <p className="text-gray-800 font-semibold text-sm py-1">
                  Salary : <span className="font-bold"></span>
                  <span className="text-sm text-gray-500">
                    {job.salary} / {job.period}
                  </span>
                </p>

                {/* <p className="text-sm text-gray-500 mt-2">{job.description}</p> */}
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                <span className="flex items-center gap-2 font-semibold text-gray-800">
                  Application Start :{" "}
                  <span className="text-green-500">20/08/25</span>
                </span>

                <span className="flex items-center gap-2 font-semibold text-gray-800">
                  Deadline:{" "}
                  <span className="text-red-500">
                    {job.applicationDeadline}
                  </span>
                </span>
              </div>

              {/* skills */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="font-semibold text-gray-800">Skils : </span>
                {job.skills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-full font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* bottom row: CTA + report */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition"
                  aria-label={`details-${job.id}`}
                  onClick={() => setIsFlipped(true)}
                >
                  <FaInfoCircle /> DETAILS
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500 text-white px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition"
                  aria-label={`apply-${job.id}`}
                onClick={() =>handleApply(job)}
                >
                  APPLY <FaRocket />
                </button>
              </div>

              <div className="text-sm text-gray-400">Report</div>
            </div>
          </article>
        </div>

        <div className="flip-back  rounded-2xl shadow-lg">
          <article
            className="bg-white rounded-2xl p-8 flex flex-col justify-between card-accent9  transform transition-all hover:-translate-y-3 hover:shadow-2xl"
            aria-labelledby={`job-${job.id}-title`}
          >
            <div>
              {/* header: company + location */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* logo placeholder */}
                  <div className="w-20 h-20 rounded-full  flex items-center justify-center">
                    {/* if logo url exists, replace with <img src={job.logo} /> */}
                    <span className="text-sm font-semibold text-gray-600">
                      <img src="https://digitalflyhigh.in/images/logo.svg" />
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {job.company}
                    </h4>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <FaMapMarkerAlt className="inline-block text-gray-400" />{" "}
                      {job.location}
                    </p>
                  </div>
                </div>

                {/* small corner number or logo can go here */}
                <div className="text-sm text-gray-200"> </div>
              </div>

              {/* category */}
              <p className="text-orange-500 font-semibold mt-5">
                {job.category}
              </p>

              {/* title */}
              <h3
                id={`job-${job.id}-title`}
                className="mt-2 text-2xl font-bold text-gray-900 leading-tight"
              >
                {job.title}
              </h3>

              {/* meta: type & posted */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                <span className="flex items-center gap-2">
                  <FaBriefcase className="text-gray-400" />{" "}
                  <span>{job.type}</span>
                </span>
                <span className="flex items-center gap-2">
                  <FaRegClock className="text-black-900" /> Posted :{" "}
                  <span className="text-gray-400">{job.posted}</span>
                </span>
              </div>

              {/* salary */}
              <div className="mt-5">
                <p className="text-gray-800 font-semibold text-sm py-1">
                  Experience-Level: <span className="font-bold"></span>
                  <span className="text-sm text-gray-500">
                    {job.experienceLevel}
                  </span>
                </p>

                <p className="text-gray-800 font-semibold text-sm py-1">
                  Languages : <span className="font-bold"></span>
                  <span className="text-sm text-gray-500">
                    {job.languagesRequired.map((s, i) => (
                      <span
                        key={i}
                        className="text-xs text-gray-600 bg-red-50 px-3 pt-1  font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </span>
                </p>
                <p className="text-gray-800 font-semibold text-sm py-1">
                  Shift : <span className="font-bold"></span>
                  <span className="text-sm text-gray-500">
                    {job.workSchedule}
                  </span>
                </p>

              </div>

             

              <p className="text-gray-800 font-semibold text-sm py-1">
                <span className="font-bold">Responsibilities :</span> 
                <span className="text-sm text-gray-500">
                  {job.responsibilities.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs text-gray-600 bg-red-50 px-3 pt-1  font-medium"
                    >
                    <br />  {s}
                    </span>
                  ))}
                </span>
              </p>
            </div>

            {/* bottom row: CTA + report */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white px-4 py-2 rounded-lg shadow-md text-sm font-semibold transition"
                  aria-label={`details-${job.id}`}
                  onClick={() => setIsFlipped(false)}
                >
                  <FaInfoCircle /> Back
                </button>

              </div>

              <div className="text-sm text-gray-400">Report</div>
            </div>
          </article>
        </div>
      </div>
       {isModalOpen && (
  <JobApplicationModal
    isOpen={isModalOpen}
    onClose={closeModal} // changed prop name to match modal
    jobTitle={selectedJob?.title || "Senior Frontend Engineer"}
  />
)}

    </div>
    
  );
};

const CareerPost = ({ jobs = sampleJobs }) => {
 
 
    return (
    <section className="bg-color-contact py-20 md:py-32 relative overflow-hidden">
      {/* decorative subtle pattern using SVG — low opacity */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="opacity-10"
        >
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,100 C300,180 900,20 1200,100 L1200,0 L0,0 Z"
            fill="url(#g)"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Latest Job Postings
          </h2>
          <p className="text-white/85 mt-3">
            Find the job that suits you here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id}/>
          ))}
        </div>
      </div>

     
    </section>
  );
};

export default CareerPost;
