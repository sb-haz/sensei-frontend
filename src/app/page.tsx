'use client'

import { useState, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { PreviewBox } from '@/components/PreviewBox'
import { Play, Sparkles, Atom, Check } from 'lucide-react'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />

      <main>
        <section className="pt-0 pb-8 md:pb-16 relative overflow-hidden">
          <div className="absolute inset-0 z-0 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_0%,#fff_40%,#2563eb_100%)]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-white z-10 rounded-t-[100%] transform scale-x-150"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center space-y-8">
              <motion.div 
                className="space-y-4 sm:space-y-6 sm:mt-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-sm font-medium text-blue-600"
                  variants={itemVariants}
                >
                  <Sparkles className="w-4 h-4" />
                  Best Interview Prep Tool
                </motion.div>
                <motion.div className="space-y-6" variants={itemVariants}>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
                    AI-Powered Interview Prep
                    <span className="text-blue-600"> That Works.</span>
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    Interview Sensei equips candidates with realistic simulations, data-driven feedback, and AI-tailored coaching to build confidence and improve outcomes—whether you`&apos;`re a graduate or a seasoned pro.
                  </p>
                </motion.div>
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  variants={itemVariants}
                >
                  <motion.button 
                    className="bg-blue-600 text-white px-8 py-3.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium"
                    onClick={handleGetStarted}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    Try It Now
                  </motion.button>
                  <motion.button 
                    className="text-gray-700 px-8 py-3.5 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Watch Demo
                  </motion.button>
                </motion.div>
              </motion.div>
              <motion.div 
                className="relative max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <PreviewBox />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-12 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              We Solve Real Interview Problems
            </motion.h2>
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  title: "No Realistic Practice",
                  problem: "Traditional methods don't simulate actual interview pressure or technical tasks.",
                  solution: "Interview Sensei offers adaptive, AI-driven simulations including technical and soft-skill questions."
                },
                {
                  title: "Generic Feedback",
                  problem: "Most tools give vague tips that don't help.",
                  solution: "Get detailed reports highlighting exact areas to improve—from content to delivery."
                },
                {
                  title: "Weak CVs",
                  problem: "Standard CV templates aren't optimized for roles or ATS systems.",
                  solution: "Receive AI-powered, role-specific resume feedback to boost your chances."
                },
                {
                  title: "Language/Accent Barriers",
                  problem: "Many platforms don't understand accents or multilingual needs.",
                  solution: "Our multilingual transcription module detects diverse accents with high accuracy."
                },
                {
                  title: "Soft Skills Neglected",
                  problem: "Hard skills dominate prep while soft skills go unchecked.",
                  solution: "Sensei emphasizes behavioral practice and interpersonal skill development."
                },
                {
                  title: "Stress & Self-Doubt",
                  problem: "Nerves and rejections hurt confidence.",
                  solution: "Realistic practice builds confidence and improves actual performance."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl shadow p-6"
                  variants={cardVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.problem}</p>
                  <p className="text-gray-800 font-medium">{item.solution}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900">Who It&apos;s For</h2>
              <p className="text-lg text-gray-600 mt-4">From first-timers to seasoned pros, Interview Sensei adapts to you.</p>
            </motion.div>
            <motion.div 
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                "Graduates struggling with nerves and unclear expectations",
                "Job switchers moving between industries",
                "Professionals preparing for promotion or leadership roles",
                "Candidates applying internationally or across cultures",
                "Tech specialists preparing for coding or system design rounds",
                "Anyone seeking personalized feedback and real improvement"
              ].map((text, index) => (
                <motion.div 
                  key={index}
                  className="p-6 bg-blue-50 rounded-xl"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  <p className="text-blue-900 font-medium">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white" id="pricing">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-12 sm:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Flexible Pricing</h2>
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-100">
                  <span className="text-gray-700 font-medium">30-day money-back guarantee</span>
                  <Check className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, staggerChildren: 0.2 }}
            >
              <motion.div 
                className="group relative rounded-3xl p-px bg-gradient-to-b from-indigo-400 via-blue-500 to-blue-600"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-[22px] p-8 h-full bg-white">
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
                    <p className="text-gray-600 mb-6">Perfect for active job seekers</p>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-bold text-gray-900">$96</span>
                      <span className="text-gray-500 font-medium">/month</span>
                    </div>
                    <ul className="space-y-4 mb-6 text-gray-700">
                      <li>4 AI interview sessions per month</li>
                      <li>Real-time performance analysis</li>
                      <li>Resume feedback (2 per month)</li>
                      <li>Behavioral & technical questions</li>
                    </ul>
                    <motion.button 
                      className="w-full py-4 px-6 rounded-xl bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                      onClick={handleGetStarted}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              <motion.div 
                className="group relative rounded-3xl p-px bg-gradient-to-b from-indigo-400 via-blue-500 to-blue-600"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative rounded-[22px] p-8 h-full bg-white">
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">PRO</h3>
                    <p className="text-gray-600 mb-6">For serious candidates</p>
                    <div className="flex items-baseline gap-2 mb-6">
                      <span className="text-5xl font-bold text-gray-900">$148</span>
                      <span className="text-gray-500 font-medium">/month</span>
                    </div>
                    <ul className="space-y-4 mb-6 text-gray-700">
                      <li>Unlimited AI interview sessions</li>
                      <li>Advanced technical, behavioral, and case rounds</li>
                      <li>Unlimited resume & cover letter reviews</li>
                      <li>Priority support & instant feedback</li>
                    </ul>
                    <motion.button 
                      className="w-full py-4 px-6 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
                      onClick={handleGetStarted}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Get Premium Access
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-white" id="faq">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900">FAQ</h2>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[{
                question: "How does the AI mock interview work?",
                answer: "Our AI simulates live interview conditions and adapts based on your responses, providing detailed feedback instantly."
              }, {
                question: "What topics can I prepare for?",
                answer: "Behavioral questions, technical challenges, coding rounds, system design, and case studies tailored to your role."
              }, {
                question: "Do you support resume reviews?",
                answer: "Yes. Both plans include resume review. PRO users get unlimited, tailored CV and cover letter analysis."
              }, {
                question: "Is my data private?",
                answer: "Absolutely. Sessions are encrypted and your data is never shared."
              }].map((faq, index) => (
                <motion.div 
                  key={index} 
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                  variants={cardVariants}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <footer className="bg-white text-gray-700 border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Atom className="w-8 h-8 text-blue-500" />
                  <span className="text-xl font-bold text-gray-900">Interview Sensei</span>
                </div>
                <p className="text-sm text-gray-600">
                  Empowering candidates to ace interviews with realistic simulations and AI-driven feedback.
                </p>
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:text-blue-600 transition-colors">Features</a></li>
                  <li><a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a></li>
                  <li><a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#blog" className="hover:text-blue-600 transition-colors">Blog</a></li>
                  <li><a href="#guides" className="hover:text-blue-600 transition-colors">Guides</a></li>
                  <li><a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-gray-900 font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li><a href="mailto:support@interviewsensei.com" className="hover:text-blue-600 transition-colors">support@interviewsensei.com</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 mt-12 pt-8 text-sm text-gray-500">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p>&copy; {new Date().getFullYear()} Interview Sensei. All rights reserved.</p>
                <div className="flex gap-6">
                  <a href="#privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                  <a href="#terms" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}