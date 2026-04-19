import { motion } from 'framer-motion';

const features = [
  {
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience",
    icon: "👨‍🏫",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to courses",
    icon: "⏰",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Certificate Programs",
    description: "Earn recognized certificates upon completion",
    icon: "📜",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Community Support",
    description: "Join a community of learners and get support",
    icon: "🤝",
    gradient: "from-orange-500 to-red-500"
  }
];

export default function Features() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            What Makes{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              BlueLion Tech
            </span>
            <br />
            Special?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We combine expert mentorship, flexible learning, industry-relevant programs, and a supportive community to help you achieve real results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}></div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className={`text-6xl mb-4 inline-block bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="mt-4 text-blue-600 font-semibold cursor-pointer inline-block"
                >
                  Learn More →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}