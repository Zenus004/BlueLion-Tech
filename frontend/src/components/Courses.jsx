import { motion } from 'framer-motion';

const courses = [
  {
    title: "BCA",
    fullName: "Bachelor of Computer Applications",
    duration: "3 Years",
    fee: "₹2.9 Lakh",
    icon: "💻",
    color: "from-blue-500 to-cyan-500",
    features: ["Programming", "Database Management", "Web Development", "Software Engineering"]
  },
  {
    title: "BSc IT",
    fullName: "Bachelor of Science in Information Technology",
    duration: "3 Years",
    fee: "₹3.9 Lakh",
    icon: "🔬",
    color: "from-purple-500 to-pink-500",
    features: ["Networking", "Cyber Security", "Cloud Computing", "IT Infrastructure"]
  },
  {
    title: "B.Tech",
    fullName: "Bachelor of Technology",
    duration: "4 Years",
    fee: "₹5.9 Lakh",
    icon: "⚙️",
    color: "from-green-500 to-emerald-500",
    features: ["Engineering", "Robotics", "AI & ML", "IoT"]
  },
  {
    title: "BBA",
    fullName: "Bachelor of Business Administration",
    duration: "3 Years",
    fee: "₹2.9 Lakh",
    icon: "📊",
    color: "from-orange-500 to-red-500",
    features: ["Management", "Marketing", "Finance", "Entrepreneurship"]
  }
];

export default function Courses() {
  return (
    <section id="courses" className="py-24 relative overflow-hidden bg-gradient-to-br from-sky-100 via-blue-100 to-violet-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <span className="text-5xl">🎓</span>
          </motion.div>
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider bg-blue-100 px-4 py-2 rounded-full inline-block mb-4">
            Academic Programs 2025-26
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-800">
            Featured Learning{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Choose from our comprehensive range of undergraduate programs 
            designed to prepare you for the future of technology and business
          </p>
        </motion.div>

        {/* Course Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              {/* Card Content */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                {/* Header */}
                <div className={`bg-gradient-to-r ${course.color} p-6 relative overflow-hidden`}>
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="text-5xl mb-2"
                  >
                    {course.icon}
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-1">{course.title}</h3>
                  <p className="text-white/90 text-sm">{course.fullName}</p>
                  <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full" />
                </div>

                {/* Body */}
                <div className="p-6">
                  {/* Duration & Fee */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-500">Program Duration</span>
                      <span className="text-sm font-semibold text-gray-700">{course.duration}</span>
                    </div>
                    <div className="border-t border-gray-100 my-3"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Total Fee</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {course.fee}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="text-sm text-gray-500 mb-3">Key Highlights</div>
                    <div className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-6 w-full py-2.5 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r ${course.color} text-white hover:shadow-lg`}
                  >
                    Apply Now →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100 shadow-lg"
        >
          <div className="text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">For Admission Inquiry</h3>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-4">
              <a href="tel:+9170378332783" className="text-xl text-blue-600 hover:text-blue-700 transition font-semibold">
                +91 7038332783
              </a>
              <a href="tel:+918999114538" className="text-xl text-blue-600 hover:text-blue-700 transition font-semibold">
                +91 8999114538
              </a>
               <a href="tel:+919749294592" className="text-xl text-blue-600 hover:text-blue-700 transition font-semibold">
                +91 9749294592
              </a>
            </div>
            <p className="text-gray-600">
              Limited seats available for the academic year 2025-26. Apply early!
            </p>
          </div>
        </motion.div>

        {/* Branch Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-block bg-blue-50 rounded-full px-6 py-3 border border-blue-100">
            <span className="text-gray-600 text-sm">
              🏛️ Branch Code: <span className="text-blue-600 font-semibold">WB202623</span>
            </span>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}