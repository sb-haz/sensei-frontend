"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Play, 
  BarChart3, 
  BookOpen, 
  User, 
  Settings, 
  Target, 
  Trophy, 
  TrendingUp,
  Brain,
  Code,
  Users,
  MessageSquare,
  Star,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Download,
  Eye,
  CheckCircle,
  PlayCircle,
  RotateCcw,
  Atom
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen] = useState(true);
  const router = useRouter();

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'practice', label: 'Practice Interview', icon: Play },
    { id: 'analytics', label: 'Performance', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'topics', label: 'Topics', icon: Target },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockData = {
    stats: {
      totalInterviews: 24,
      averageScore: 87,
      improvementRate: 23,
      streak: 7
    },
    recentInterviews: [
      { id: 1, type: 'Technical', score: 92, date: '2025-07-02', duration: '45min' },
      { id: 2, type: 'Behavioral', score: 88, date: '2025-07-01', duration: '30min' },
      { id: 3, type: 'Case Study', score: 85, date: '2025-06-30', duration: '60min' }
    ],
    courses: [
      { id: 1, title: 'JavaScript Fundamentals', progress: 85, lessons: 12, completed: 10 },
      { id: 2, title: 'System Design Basics', progress: 60, lessons: 8, completed: 5 },
      { id: 3, title: 'Behavioral Interview Mastery', progress: 100, lessons: 15, completed: 15 }
    ],
    topics: [
      { id: 1, name: 'Data Structures', practiced: 15, mastery: 90 },
      { id: 2, name: 'Algorithms', practiced: 12, mastery: 85 },
      { id: 3, name: 'System Design', practiced: 8, mastery: 70 },
      { id: 4, name: 'Behavioral Questions', practiced: 20, mastery: 95 }
    ]
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <motion.button 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          onClick={() => router.push('/dashboard/interview')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4" />
          New Interview
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Interviews', value: mockData.stats.totalInterviews, icon: Play, color: 'blue' },
          { title: 'Average Score', value: `${mockData.stats.averageScore}%`, icon: Trophy, color: 'green' },
          { title: 'Improvement', value: `+${mockData.stats.improvementRate}%`, icon: TrendingUp, color: 'purple' },
          { title: 'Current Streak', value: `${mockData.stats.streak} days`, icon: Target, color: 'orange' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Interviews</h2>
          <div className="space-y-3">
            {mockData.recentInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{interview.type}</p>
                    <p className="text-sm text-gray-600">{interview.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{interview.score}%</p>
                  <p className="text-sm text-gray-600">{interview.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Readiness Score</h2>
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Readiness</span>
                <span className="text-sm font-medium text-blue-600">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            {[
              { name: 'Technical Skills', score: 92 },
              { name: 'Communication', score: 85 },
              { name: 'Problem Solving', score: 90 },
              { name: 'Cultural Fit', score: 80 }
            ].map((skill, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{skill.name}</span>
                  <span className="text-sm text-gray-900">{skill.score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full" 
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPractice = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Practice Interview</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Interview Types */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Interview Type</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { type: 'Technical', icon: Code, description: 'Coding challenges and system design', duration: '45-60 min', difficulty: 'Medium' },
              { type: 'Behavioral', icon: MessageSquare, description: 'Soft skills and experience questions', duration: '30-45 min', difficulty: 'Easy' },
              { type: 'Case Study', icon: Brain, description: 'Problem-solving scenarios', duration: '60-90 min', difficulty: 'Hard' },
              { type: 'Leadership', icon: Users, description: 'Management and team leadership', duration: '45-60 min', difficulty: 'Medium' }
            ].map((interviewType, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/dashboard/interview')}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <interviewType.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{interviewType.type}</h3>
                    <p className="text-sm text-gray-600">{interviewType.duration}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{interviewType.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    interviewType.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    interviewType.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {interviewType.difficulty}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h2>
            <div className="space-y-3">
              <motion.button 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                onClick={() => router.push('/dashboard/interview')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlayCircle className="w-5 h-5" />
                Start Random Interview
              </motion.button>
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <RotateCcw className="w-5 h-5" />
                Resume Last Session
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Goal</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Complete 2 interviews</span>
                <span className="text-sm font-medium text-blue-600">1/2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
              </div>
              <p className="text-xs text-gray-500">Keep going! You&apos;re halfway there.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Performance Analytics</h1>
        <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Score Trends</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart visualization would go here</p>
          </div>
        </div>

        {/* Skill Breakdown */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Skill Breakdown</h2>
          <div className="space-y-4">
            {[
              { skill: 'Problem Solving', score: 92, change: '+5' },
              { skill: 'Communication', score: 88, change: '+3' },
              { skill: 'Technical Knowledge', score: 85, change: '+8' },
              { skill: 'Leadership', score: 82, change: '+2' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.skill}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">{item.change}</span>
                      <span className="text-sm font-medium text-gray-900">{item.score}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-sm font-medium text-gray-700">Date</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Type</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Duration</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Score</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 text-sm font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockData.recentInterviews.map((interview) => (
                <tr key={interview.id} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900">{interview.date}</td>
                  <td className="py-3 text-sm text-gray-900">{interview.type}</td>
                  <td className="py-3 text-sm text-gray-600">{interview.duration}</td>
                  <td className="py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {interview.score}%
                    </span>
                  </td>
                  <td className="py-3">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </td>
                  <td className="py-3">
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Browse Courses
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.courses.map((course) => (
          <motion.div
            key={course.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.lessons} lessons</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-blue-600">{course.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                {course.completed} of {course.lessons} lessons completed
              </p>
              
              <motion.button 
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {course.progress === 100 ? 'Review' : 'Continue'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTopics = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Practice Topics</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Topic
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockData.topics.map((topic) => (
          <motion.div
            key={topic.id}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{topic.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-900">{topic.mastery}%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mastery Level</span>
                <span className="text-sm font-medium">{topic.mastery}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    topic.mastery >= 90 ? 'bg-green-500' :
                    topic.mastery >= 70 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${topic.mastery}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                Practiced {topic.practiced} times
              </p>
              
              <motion.button 
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                onClick={() => router.push('/dashboard/interview')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Practice Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
            <p className="text-gray-600">Software Engineer</p>
            <p className="text-sm text-gray-500 mt-2">Member since Jan 2025</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Entry Level</option>
                  <option>Mid Level</option>
                  <option defaultValue>Senior Level</option>
                  <option>Executive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Interview Types</label>
                <div className="flex flex-wrap gap-2">
                  {['Technical', 'Behavioral', 'Case Study', 'Leadership'].map((type) => (
                    <label key={type} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Companies</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Google, Microsoft, Amazon..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', description: 'Receive updates about your progress' },
              { label: 'Practice reminders', description: 'Daily reminders to practice interviews' },
              { label: 'Achievement alerts', description: 'Notifications when you reach milestones' }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{setting.label}</p>
                  <p className="text-sm text-gray-600">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Data sharing</p>
                <p className="text-sm text-gray-600">Share anonymized data to improve AI models</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
          <div className="space-y-4">
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'practice': return renderPractice();
      case 'analytics': return renderAnalytics();
      case 'courses': return renderCourses();
      case 'topics': return renderTopics();
      case 'profile': return renderProfile();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Atom className="w-8 h-8 text-blue-600" />
            {sidebarOpen && <span className="text-xl font-bold text-gray-900">Interview Sensei</span>}
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </motion.button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;