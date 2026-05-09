import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const projects = [
  { title: "Line Follower Robot", category: "Robotics", image: "/line-follower.jpg", description: "Build a robot that follows a path autonomously", color: "from-blue-500 to-cyan-500" },
  { title: "Smart Home IoT", category: "IoT", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80", description: "Control home appliances with your smartphone", color: "from-purple-500 to-pink-500" },
  { title: "AI Face Detection", category: "Artificial Intelligence", image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800", description: "Create smart systems that recognize faces", color: "from-green-500 to-emerald-500" },
  { title: "Gesture Control Robot", category: "Robotics", image: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=800&q=80", description: "Control robots with hand movements", color: "from-orange-500 to-red-500" },
  { title: "Drone Flying", category: "Aerospace", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80", description: "Learn drone piloting and aerial robotics", color: "from-cyan-500 to-blue-500" },
  { title: "3D Printed Models", category: "Design", image: "/3d_printed_model.jpg", description: "Design and print your own creations", color: "from-indigo-500 to-purple-500" }
];

export default function DroneSection() {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-4">
            <span className="text-white">What Your Child Will</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Build & Create</span>
          </h2>
          <p className="text-blue-200/80 text-base md:text-lg max-w-2xl mx-auto">Hands-on projects that inspire creativity, innovation, and future-ready skills</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className="group cursor-pointer">
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/40 h-full">
                <div className="relative overflow-hidden h-64">
                  <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover" animate={{ scale: hoveredIndex === index ? 1.1 : 1 }} transition={{ duration: 0.4 }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4"><div className={`bg-gradient-to-r ${project.color} px-3 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-sm`}>{project.category}</div></div>
                </div>
                <div className="p-6"><h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{project.title}</h3><p className="text-blue-200 text-sm">{project.description}</p></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }} className="mt-12">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-left">
                <h4 className="text-2xl font-bold text-white mb-2">Ready to Start Your Child's Journey?</h4>
                <p className="text-blue-200">Join our project-based learning program today!</p>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all" onClick={() => navigate(`/enroll?program=${encodeURIComponent("Tech Explorers")}`)}>
                Enroll Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
