import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "Line Follower Robot",
    category: "Robotics",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80",
    description: "Build a robot that follows a path autonomously",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Smart Home IoT",
    category: "IoT",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    description: "Control home appliances with your smartphone",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "AI Face Detection",
    category: "Artificial Intelligence",
    image:"https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Create smart systems that recognize faces",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Gesture Control Robot",
    category: "Robotics",
    image: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?auto=format&fit=crop&w=800&q=80",
    description: "Control robots with hand movements",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Drone Flying",
    category: "Aerospace",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80",
    description: "Learn drone piloting and aerial robotics",
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "3D Printed Models",
    category: "Design",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80",

    description: "Design and print your own creations",
    color: "from-indigo-500 to-purple-500"
  }
];

export default function DroneSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 rounded-full shadow-xl">
              <span className="text-3xl">🎯</span>
            </div>
          </motion.div>
          
          <div className="relative inline-block mb-4">
            <span className="relative text-cyan-300 font-semibold text-sm uppercase tracking-wider bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-block border border-white/20">
              Student Projects Gallery
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-4">
            <span className="text-white">What Your Child Will</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Build & Create
            </span>
          </h2>
          
          <p className="text-blue-200/80 text-base md:text-lg max-w-2xl mx-auto">
            Hands-on projects that inspire creativity, innovation, and future-ready skills
          </p>
        </motion.div>

        {/* Project Grid - 2x3 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group cursor-pointer"
            >
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/20 hover:border-white/40 h-full">
                {/* Image Container */}
                <div className="relative overflow-hidden h-64">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <div className={`bg-gradient-to-r ${project.color} px-3 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-sm`}>
                      {project.category}
                    </div>
                  </div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="text-4xl drop-shadow-lg">
                      {project.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-blue-200 text-sm">
                    {project.description}
                  </p>
                  
                  {/* Hover Effect Line */}
                  <motion.div 
                    className={`h-0.5 bg-gradient-to-r ${project.color} mt-4`}
                    initial={{ width: 0 }}
                    animate={{ width: hoveredIndex === index ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Tags Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Skills Your Child Will Learn
              </h3>
              <p className="text-blue-200 text-sm">
                Future-ready competencies through hands-on projects
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Robotics", icon: "🤖", color: "from-blue-500 to-cyan-500" },
                { name: "IoT", icon: "🏠", color: "from-purple-500 to-pink-500" },
                { name: "Artificial Intelligence", icon: "🧠", color: "from-green-500 to-emerald-500" },
                { name: "Drone Technology", icon: "🚁", color: "from-cyan-500 to-blue-500" },
                { name: "3D Printing", icon: "🖨️", color: "from-indigo-500 to-purple-500" },
                { name: "Programming", icon: "💻", color: "from-orange-500 to-red-500" }
              ].map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${skill.color} text-white shadow-lg`}
                >
                  <span className="text-lg">{skill.icon}</span>
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-left">
                <h4 className="text-2xl font-bold text-white mb-2">
                  Ready to Start Your Child's Journey?
                </h4>
                <p className="text-blue-200">
                  Join our project-based learning program today!
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all"
              >
                Enroll Now →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}