import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-4 md:px-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Building Your Skills,{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Expanding Your Horizons
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 mb-8"
          >
           Unlock industry-ready skills with expert-led courses, flexible learning paths, and real-world knowledge designed to help you grow faster.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition shadow-lg">
              Get Started
            </button>
            <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-50 transition">
              Free Trial
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-8 md:gap-12 mt-12"
          >
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">700+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">120+</div>
              <div className="text-gray-600">Courses</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}