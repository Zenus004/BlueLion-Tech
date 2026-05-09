import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const courses = [
  { title: 'BCA', fullName: 'Bachelor of Computer Applications', duration: '3 Years', fee: 'Rs 2.9 Lakh', color: 'from-blue-500 to-cyan-500', features: ['Programming', 'Database Management', 'Web Development', 'Software Engineering'] },
  { title: 'BSc IT', fullName: 'Bachelor of Science in Information Technology', duration: '3 Years', fee: 'Rs 3.9 Lakh', color: 'from-purple-500 to-pink-500', features: ['Networking', 'Cyber Security', 'Cloud Computing', 'IT Infrastructure'] },
  { title: 'B.Tech', fullName: 'Bachelor of Technology', duration: '4 Years', fee: 'Rs 5.9 Lakh', color: 'from-green-500 to-emerald-500', features: ['Engineering', 'Robotics', 'AI & ML', 'IoT'] },
  { title: 'BBA', fullName: 'Bachelor of Business Administration', duration: '3 Years', fee: 'Rs 2.9 Lakh', color: 'from-orange-500 to-red-500', features: ['Management', 'Marketing', 'Finance', 'Entrepreneurship'] }
];

export default function Courses() {
  const navigate = useNavigate();

  return (
    <section id="courses" className="py-24 relative overflow-hidden bg-gradient-to-br from-sky-100 via-blue-100 to-violet-500">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider bg-blue-100 px-4 py-2 rounded-full inline-block mb-4">Academic Programs 2026-27</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 text-gray-800">Featured Learning <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Opportunities</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10, scale: 1.02 }} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                <div className={`bg-gradient-to-r ${course.color} p-6 relative overflow-hidden`}>
                  <h3 className="text-3xl font-bold text-white mb-1">{course.title}</h3>
                  <p className="text-white/90 text-sm">{course.fullName}</p>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3"><span className="text-sm text-gray-500">Program Duration</span><span className="text-sm font-semibold text-gray-700">{course.duration}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm text-gray-500">Total Fee</span><span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{course.fee}</span></div>
                  </div>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="text-sm text-gray-500 mb-3">Key Highlights</div>
                    <div className="space-y-2">{course.features.map((feature, idx) => <div key={idx} className="flex items-center gap-2 text-sm text-gray-600"><span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />{feature}</div>)}</div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`mt-6 w-full py-2.5 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r ${course.color} text-white hover:shadow-lg`} onClick={() => navigate(`/apply?course=${encodeURIComponent(course.title)}`)}>Apply Now</motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
