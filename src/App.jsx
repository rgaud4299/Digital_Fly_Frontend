


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import ContactForm from "./Pages/ContactForm";
import OurServicesSection from "./Pages/OurServicesSection";
import FAQAccordion from "./Pages/FAQAccordion";
import Footer from "./Components/Footer";
import PricingPlans from "./Pages/Pricing";
import ProjectBasedSolutions from "./Pages/ProjectBasedSolutions";
import WhyUs from "./Pages/WhyUs";
import Navbar from "./Pages/Navbar";
import About from "./Pages/About";
import HeroSection from "./Pages/HeroSection";
import { motion as Motion , useScroll } from "framer-motion";

import Product from './Components/ServicesDetailsSection/Product';
import TermsOfService from './Components/Term_condition/TermsOfService';
import PrivacyPolicy from './Components/Term_condition/PrivacyPolicy';
import ScrollToTop from './utils/ScrollToTop';
import Portfolio from './Pages/Portfolio';
import CareerPost from './Components/Career/JobPosts';
import LeadershipSection from './Pages/LeadershipSection';
import Section from './Components/ServicesDetailsSection/Section';
// import Sections from './Components/ServicesDetailsSection/Section';



function App() {
  const { scrollYProgress } = useScroll();
  // const navigate = useNavigate();


  return (
    <>

{ 
      <Motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          zIndex: 9999,
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          originX: 0,
          backgroundColor: "#178de6",
        }}
      />
      }

      <Navbar />

        <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <>
               <HeroSection
                videoSrc="https://digitalflyhigh.in/video/2.mp4"
                subtitle="Your Partner in Digital Growth"
                title="Building Bigger. Better. Brighter."
                description="We are a full-service digital agency and your dedicated growth partner. We build stunning websites, execute data-driven marketing strategies, and develop custom software to ensure your success."
              /> 


              <About />
              <WhyUs />
              <OurServicesSection />
              <PricingPlans />
              <ProjectBasedSolutions />
              {/* <LeadershipSection /> */}
              <FAQAccordion />

                 {/* <TestimonialSection/> */}

              <ContactForm />
            </>
          }
        /> 

        <Route path="/about" element={<About />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/services" element={<OurServicesSection />} />
        <Route path="/pricing" element={<PricingPlans />} />
        <Route path="/faq" element={<FAQAccordion />} />
        <Route path="/leadership" element={<LeadershipSection />} />
        <Route path="/contact" element={<ContactForm />} />
         {/* <Route path="/Portfolio" element={<Portfolio/>} /> */}
        <Route path="/career" element={<CareerPost />} />
        <Route path="/service-details" element={<Section/>} />
        <Route path="/TermsOfService" element={<TermsOfService/>} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />


      </Routes>

      <Footer />   

   <ToastContainer  position= "top-right" autoClose={2000} />

    </>
  );
}


export default App;


