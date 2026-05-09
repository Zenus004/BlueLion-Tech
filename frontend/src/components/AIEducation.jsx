import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIEducation() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(1);

  const categories = [
    { id: 1, name: 'Junior Innovators', grade: 'Grade 3-5', color: 'from-green-500 to-emerald-500' },
    { id: 2, name: 'Tech Explorers', grade: 'Grade 6-8', color: 'from-blue-500 to-cyan-500' },
    { id: 3, name: 'Pre-Professional', grade: 'Grade 9-10', color: 'from-purple-500 to-pink-500' },
    { id: 4, name: 'Industry & Startup', grade: 'Grade 11-12', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Program Overview</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">Project-Based Learning + Industry Skills + Innovation</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`p-4 rounded-xl transition-all duration-300 ${selectedCategory === cat.id ? `bg-gradient-to-r ${cat.color} shadow-lg scale-105` : 'bg-white/10 hover:bg-white/20'}`}>
              <div className="font-semibold text-sm">{cat.name}</div>
              <div className="text-xs text-gray-300">{cat.grade}</div>
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 text-center">
          <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all" onClick={() => navigate(`/enroll?program=${encodeURIComponent(categories.find((c) => c.id === selectedCategory).name)}`)}>
            Enroll Now
          </button>
        </motion.div>
      </div>
    </section>
  );
}
