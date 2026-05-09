import { useState } from 'react';
import { motion } from 'framer-motion';
import { contactService } from '../services/contactService';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const toast = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.submit(formData);
      toast.success('Message sent successfully');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Get In <span className="text-indigo-600">Touch</span></h2>
            <p className="text-gray-600 text-center mb-8">Have questions? We'd love to hear from you.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Full Name" required />
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Email Address" required />
              <textarea rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" placeholder="Message" required />
              <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50">{loading ? 'Sending...' : 'Send Message'}</button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
