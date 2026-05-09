import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-100"
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="cursor-pointer group">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">BlueLionTech</h1>
            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"></div>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {[{ name: 'Home', href: '#home' },{ name: 'About Us', href: '#aboutus' },{ name: 'Courses', href: '#courses' },{ name: 'Contact Us', href: '#contact' }].map((item, index) => (
              <motion.a key={index} whileHover={{ scale: 1.05 }} href={item.href} className="text-gray-700 hover:text-blue-600 transition font-medium relative group">
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition">Login</Link>
            <Link to="/signup" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full hover:shadow-lg transition-all">Sign Up</Link>
          </div>

          <motion.button whileTap={{ scale: 0.95 }} className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </motion.button>
        </div>

        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 space-y-3">
            {['Home', 'About Us', 'Courses', 'Contact Us'].map((item, index) => <a key={index} href={`#${item.toLowerCase().replace(' ', '')}`} className="block hover:text-blue-600 transition py-2">{item}</a>)}
            <div className="pt-2 space-x-4">
              <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
              <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2 rounded-full">Sign Up</Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
