import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AIEducation() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState('threeMonths');

  const categories = [
    {
      id: 1,
      name: "Junior Innovators",
      grade: "Grade 3–5",
      icon: "🧒",
      fees: "₹1000/month",
      admissionFee: "₹1200",
      kitPrice: "₹1500",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 2,
      name: "Tech Explorer",
      grade: "Grade 6–8",
      icon: "👦",
      fees: "₹1200/month",
      admissionFee: "₹1500",
      kitPrice: "₹2000",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 3,
      name: "Pre-Professional",
      grade: "Grade 9–10",
      icon: "🧑",
      fees: "₹2000/month",
      admissionFee: "₹1500",
      kitPrice: "₹3000",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Industry & Startup",
      grade: "Grade 11–12",
      icon: "👨",
      fees: "₹2500/month",
      admissionFee: "₹1500",
      kitPrice: "₹4000",
      color: "from-orange-500 to-red-500"
    }
  ];

  const courseContent = {
    1: {
      threeMonths: {
        theory: [
          "Robotics System Basics (Input → Process → Output)",
          "AI Awareness (Smart Devices, Voice AI)",
          "Basic Sensors & Energy Flow",
          "Design Thinking Introduction"
        ],
        practical: [
          "Build Line Follower, Obstacle Avoider, Light Robot",
          "3D Pen Models (Basic Mechanical Concepts)",
          "Sensor-based LED Automation",
          "Button-controlled Robot"
        ]
      },
      sixMonths: {
        theory: [
          "Algorithm & Logic Basics",
          "Visual Programming (Scratch)",
          "Autonomous Systems Intro",
          "Drone Ecosystem Basics"
        ],
        practical: [
          "Gesture-Control Robot (Basic)",
          "Smart City Mini Project",
          "3D Pen Mechanical Models",
          "Drone Simulator + Basic Handling",
          "Capstone Project: Smart Utility Robot"
        ]
      }
    },
    2: {
      threeMonths: {
        theory: [
          "Embedded Systems Basics",
          "Sensors (IR, Ultrasonic, LDR)",
          "Flowcharts & Logic Design",
          "AI Fundamentals"
        ],
        practical: [
          "Arduino Programming Basics",
          "Obstacle Avoidance Robot",
          "Smart Street Light System",
          "3D Pen Structural Design",
          "Drone Simulator Training"
        ]
      },
      sixMonths: {
        theory: [
          "IoT Architecture",
          "Mobile App Development Basics",
          "Machine Learning Introduction",
          "Drone Aerodynamics & Safety"
        ],
        practical: [
          "Bluetooth App-Controlled Robot",
          "IoT Smart Home System",
          "Mobile App Development (MIT App Inventor)",
          "3D Printing Basics (Slicing + Printing)",
          "Drone Flying Practice",
          "Capstone Project: IoT-Based Smart System"
        ]
      }
    },
    3: {
      threeMonths: {
        theory: [
          "Microcontroller Architecture",
          "Python Programming Basics",
          "AI & Data Processing Intro",
          "3D Printing Workflow"
        ],
        practical: [
          "Multi-Sensor Robot",
          "Serial Communication",
          "3D Printer Operation",
          "Drone Assembly Basics",
          "Computer Vision Intro (OpenCV)"
        ]
      },
      sixMonths: {
        theory: [
          "Machine Learning Workflow",
          "Computer Vision Concepts",
          "IoT Cloud Integration",
          "Drone PID Control"
        ],
        practical: [
          "AI Face Detection Project",
          "Autonomous Navigation Robot",
          "IoT Dashboard System",
          "3D Mechanical Design Project",
          "Drone Build + PID Tuning",
          "Capstone Project: AI + Robotics System"
        ]
      }
    },
    4: {
      threeMonths: {
        theory: [
          "Advanced Embedded Systems",
          "AI/ML Pipeline",
          "Electronics Circuit Design",
          "Drone Commercial Applications"
        ],
        practical: [
          "Sensor Fusion Systems",
          "Python + Hardware Integration",
          "3D Design (Fusion 360)",
          "IoT Cloud System",
          "Advanced Drone Training"
        ]
      },
      sixMonths: {
        theory: [
          "Deep Learning Basics",
          "Autonomous Systems Design",
          "Product Development Lifecycle",
          "Startup Strategy"
        ],
        practical: [
          "AI Object Detection System",
          "Fully Autonomous Robot",
          "End-to-End Product Prototype",
          "Advanced Drone Build + Optimization",
          "Final Capstone: Startup-Level Product"
        ]
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <span className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">
                Robotics & AI/ML, Drone Technology Course Details
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Program Overview
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-cyan-300 font-bold">70%</span>
              <span className="text-gray-300"> Practical</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-cyan-300 font-bold">30%</span>
              <span className="text-gray-300"> Theory</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-cyan-300">📚</span>
              <span className="text-gray-300"> 4 Categories (Grade-wise)</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-cyan-300">⏱️</span>
              <span className="text-gray-300"> 3 & 6 Months Options</span>
            </div>
          </div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Project-Based Learning + Industry Skills + Innovation
          </p>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? `bg-gradient-to-r ${cat.color} shadow-lg scale-105`
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-semibold text-sm">{cat.name}</div>
                <div className="text-xs text-gray-300">{cat.grade}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Duration Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setSelectedDuration('threeMonths')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedDuration === 'threeMonths'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            📘 3 Months Course
          </button>
          <button
            onClick={() => setSelectedDuration('sixMonths')}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedDuration === 'sixMonths'
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            📚 6 Months Course
          </button>
        </motion.div>

        {/* Course Details */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Theory */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl">
                📖
              </div>
              <div>
                <h3 className="text-2xl font-bold">Theory (30%)</h3>
                <p className="text-gray-300 text-sm">Conceptual Foundation</p>
              </div>
            </div>
            <ul className="space-y-3">
              {courseContent[selectedCategory][selectedDuration].theory.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 text-gray-200"
                >
                  <span className="text-cyan-400 mt-1">▹</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Practical */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl">
                🛠️
              </div>
              <div>
                <h3 className="text-2xl font-bold">Practical (70%)</h3>
                <p className="text-gray-300 text-sm">Hands-on Learning</p>
              </div>
            </div>
            <ul className="space-y-3">
              {courseContent[selectedCategory][selectedDuration].practical.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 text-gray-200"
                >
                  <span className="text-purple-400 mt-1">▹</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Fee Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid md:grid-cols-3 gap-4"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm text-gray-300">Monthly Fees</div>
            <div className="text-xl font-bold text-cyan-300">
              {categories.find(c => c.id === selectedCategory).fees}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🎓</div>
            <div className="text-sm text-gray-300">Admission Fee</div>
            <div className="text-xl font-bold text-cyan-300">
              {categories.find(c => c.id === selectedCategory).admissionFee}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🧰</div>
            <div className="text-sm text-gray-300">Kit Price</div>
            <div className="text-xl font-bold text-cyan-300">
              {categories.find(c => c.id === selectedCategory).kitPrice}
            </div>
          </div>
        </motion.div>

        {/* Key Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-center mb-6">🏆 Key Highlights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "70% Hands-on Learning Approach",
              "Multi-domain Skill Development (AI + Robotics + Drone + 3D)",
              "Real-world Projects & Capstone Systems",
              "Industry-Relevant Tools & Technologies",
              "Certification + Portfolio Development",
              "Innovation & Startup-Oriented Learning"
            ].map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 bg-white/5 rounded-lg p-3"
              >
                <span className="text-cyan-400 text-xl">✓</span>
                <span className="text-sm text-gray-200">{highlight}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all">
            Enroll Now → Limited Seats Available
          </button>
        </motion.div>
      </div>
    </section>
  );
}