import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Courses from './Courses';
import DroneSection from './DroneSection';
import AIEducation from './AIEducation';
import CBSEUpdate from './CBSEUpdate';
import Contact from './Contact';
import Footer from './Footer';

export default function LandingPage({ onLogoClick }) {
  return (
    <>
      <Navbar onLogoClick={onLogoClick} />
      <Hero />
      <Features />
      <Courses />
      <CBSEUpdate />
      <AIEducation />
      <DroneSection />
      <Contact />
      <Footer />
    </>
  );
}