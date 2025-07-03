'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  PhoneOff, 
  Settings, 
  Atom, 
  Clock, 
  PanelLeft, 
  Eye, 
  EyeOff, 
  Repeat, 
  ChevronLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreVertical,
  Lightbulb,
  Target,
  Award,
  Activity
} from 'lucide-react'

// Add custom styles for hiding scrollbar
const hideScrollbarStyle = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

type InterviewQuestions = string[]

const mockQuestions: InterviewQuestions = [
  "Your CV mentions you led a migration to AWS. Can you tell us more about that experience and the challenges you faced?"
]

const questionHints = [
  {
    tips: [
      "Talk about why your team decided to migrate to AWS",
      "Mention which AWS services you used and why",
      "Share one key challenge and how you solved it"
    ]
  }
];

const InterviewSession = () => {
  const [interviewerSpeaking, setInterviewerSpeaking] = useState<boolean>(false)
  const [userSpeaking, setUserSpeaking] = useState<boolean>(false)
  const [interviewerTranscript, setInterviewerTranscript] = useState<string>('')
  const [userTranscript, setUserTranscript] = useState<string>('')
  const [interviewerName, setInterviewerName] = useState<string>("Sarah Chen")
  const [micEnabled, setMicEnabled] = useState<boolean>(false)
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true)
  const [callActive, setCallActive] = useState<boolean>(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)
  const [interviewType, setInterviewType] = useState<string>("Technical")
  const [showHints, setShowHints] = useState<boolean>(true)
  const [isTypingHints, setIsTypingHints] = useState<boolean>(false)
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false)
  const [currentHints, setCurrentHints] = useState({
    tips: [""]
  })
  
  // Video reference
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Function to handle video click - enables audio
  const handleVideoClick = () => {
    setAudioEnabled(true)
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play()
    }
  }
  
  // Simulate interview flow
  useEffect(() => {
    if (!callActive) return
    
    let timeoutIds: NodeJS.Timeout[] = []
    
    // Auto-start the interview cycle
    const askQuestion = async () => {
      // Reset states
      setInterviewerTranscript('')
      setUserTranscript('')
      setIsTypingHints(false)
      
      // Interviewer asks question
      setInterviewerSpeaking(true)
      const question = mockQuestions[0] // Always use the AWS migration question
      
      // Play video
      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
      
      // Type out question over 8 seconds
      const typingDelay = 8000 / question.length
      for (let i = 0; i <= question.length; i++) {
        if (!callActive) break
        const id = setTimeout(() => {
          setInterviewerTranscript(question.slice(0, i))
        }, i * typingDelay)
        timeoutIds.push(id)
      }
      
      // Interviewer finishes speaking after typing is complete
      const speakingEndId = setTimeout(() => {
        setInterviewerSpeaking(false)
        
        // Pause video
        if (videoRef.current) {
          videoRef.current.pause()
        }
        
        // Start typing hints
        setIsTypingHints(true)
        
        // Reset hints
        setCurrentHints({
          tips: [""]
        })
      }, 6800)
      timeoutIds.push(speakingEndId)
      
      // Type out hints progressively
      const hints = questionHints[0]
      
      const hintsStartId = setTimeout(() => {
        for (let i = 0; i < hints.tips.length; i++) {
          for (let j = 0; j <= hints.tips[i].length; j++) {
            const hintId = setTimeout(() => {
              if (!callActive) return
              setCurrentHints(prev => ({
                tips: [
                  ...prev.tips.slice(0, i),
                  hints.tips[i].slice(0, j),
                  ...prev.tips.slice(i + 1)
                ]
              }))
            }, (i * hints.tips[i].length * 5) + (j * 5))
            timeoutIds.push(hintId)
          }
        }
        
        const hintEndId = setTimeout(() => {
          setIsTypingHints(false)
        }, hints.tips.reduce((acc, tip) => acc + tip.length * 5, 0) + 100)
        timeoutIds.push(hintEndId)
      }, 8100)
      timeoutIds.push(hintsStartId)
      
      // User's turn to speak (simulated response) after 1s delay
      const userStartId = setTimeout(() => {
        setUserSpeaking(true)
        
        const userResponse = "Yes, at my previous company we migrated from on-prem to AWS over about 6 months. We primarily used ECS for containerization, RDS for databases, and S3 for storage. The main challenge was ensuring zero downtime, which we solved with a phased approach using Route 53 for traffic management."
        
        for (let i = 0; i <= userResponse.length; i++) {
          const userId = setTimeout(() => {
            if (!callActive) return
            setUserTranscript(userResponse.slice(0, i))
          }, i * 20)
          timeoutIds.push(userId)
        }
        
        // User finishes speaking
        const userEndId = setTimeout(() => {
          setUserSpeaking(false)
          
          // Wait 2 seconds then automatically restart the interview cycle
          const restartId = setTimeout(() => {
            askQuestion() // Restart the cycle
          }, 2000)
          timeoutIds.push(restartId)
        }, userResponse.length * 20 + 1000)
        timeoutIds.push(userEndId)
      }, 9000 + questionHints[0].tips.reduce((acc, tip) => acc + tip.length * 5, 0))
      timeoutIds.push(userStartId)
    }
    
    askQuestion()
    
    // Cleanup function
    return () => {
      timeoutIds.forEach(id => clearTimeout(id))
    }
  }, [callActive])

  const endCall = () => {
    setCallActive(false)
  }

  const toggleMic = () => setMicEnabled(!micEnabled)
  const toggleVideo = () => setVideoEnabled(!videoEnabled)
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed)
  const toggleHints = () => setShowHints(!showHints)
  
  const repeatQuestion = () => {
    // Restart the interview cycle
    setCallActive(false)
    setTimeout(() => setCallActive(true), 100)
  }
  
  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Add style tag for custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: hideScrollbarStyle }} />
      
      {/* Sidebar */}
      <motion.div 
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? 'w-16' : 'w-80'
        }`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <Atom className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Interview Sensei</span>
              </div>
            )}
            {sidebarCollapsed && (
              <Atom className="w-8 h-8 text-blue-600 mx-auto" />
            )}
            <button 
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-6">
          {/* Interview Progress */}
          <div className="mb-6">
            {!sidebarCollapsed && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">Interview Progress</h3>
                  <span className="text-xs text-gray-500">4/10</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Interview Info */}
          <div className="mb-6">
            {!sidebarCollapsed && (
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Session Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {interviewType}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="text-sm font-medium text-gray-900">30 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Difficulty</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                      Medium
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* AI Hints Section */}
          <div className="mb-6">
            {!sidebarCollapsed && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <h3 className="text-sm font-semibold text-gray-900">AI Response Tips</h3>
                  </div>
                  <button 
                    onClick={toggleHints}
                    className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                {showHints && (
                  <motion.div 
                    className="bg-blue-50 rounded-xl p-4 border border-blue-100"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="space-y-3">
                      {currentHints.tips.map((tip, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-2 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 leading-relaxed">{tip}</span>
                        </motion.div>
                      ))}
                    </div>
                    {isTypingHints && (
                      <div className="flex justify-center mt-3">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          {!sidebarCollapsed && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Live Performance</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Clarity</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Confidence</span>
                  </div>
                  <span className="text-sm font-medium text-blue-600">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">Relevance</span>
                  </div>
                  <span className="text-sm font-medium text-purple-600">92%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.div 
          className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{interviewType} Interview</h1>
              <p className="text-sm text-gray-600">Question 4 of 10</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">25:30 remaining</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <div className="absolute inset-0 h-2 w-2 bg-red-500 rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm text-gray-600">Recording</span>
            </div>

            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
        
        {/* Interview Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Interviewer Video */}
              <motion.div 
                className="bg-white rounded-xl p-6 border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Interviewer</h2>
                  {interviewerSpeaking && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-700">Speaking</span>
                    </div>
                  )}
                </div>
                
                <div className={`relative aspect-video rounded-xl overflow-hidden transition-all duration-300 ${
                  interviewerSpeaking ? 'ring-2 ring-blue-500' : ''
                }`}>
                  <video 
                    ref={videoRef}
                    src="int.mp4"
                    className="w-full h-full object-cover cursor-pointer"
                    muted={!audioEnabled} 
                    playsInline
                    autoPlay
                    loop
                    onClick={handleVideoClick}
                  />
                  {!audioEnabled && (
                    <div 
                      className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer z-10"
                      onClick={handleVideoClick}
                    >
                      <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                        <Volume2 className="w-4 h-4" />
                        Click to enable audio
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm">
                      <span className="text-sm text-white font-medium">{interviewerName}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Your Video */}
              <motion.div 
                className="bg-white rounded-xl p-6 border border-gray-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">You</h2>
                  {userSpeaking && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full">
                      <Mic className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Speaking</span>
                    </div>
                  )}
                </div>
                
                <div className={`relative aspect-video rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center transition-all duration-300 ${
                  userSpeaking ? 'ring-2 ring-blue-500' : ''
                }`}>
                  {videoEnabled ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">JD</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <VideoOff className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-500">Camera off</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Question and Response */}
            <motion.div 
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Question Section */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Question</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-800 leading-relaxed">
                    {interviewerTranscript || (
                      <span className="text-gray-400 italic">Interviewer is preparing the next question...</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Response Section */}
              <div className="p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Response</h3>
                <div className="bg-white rounded-lg p-4 min-h-24 border border-gray-200">
                  <p className="text-gray-700 leading-relaxed">
                    {userTranscript || (
                      <span className="text-gray-400 italic">Start speaking to see your response transcribed here...</span>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Call Controls */}
        <motion.div 
          className="bg-white border-t border-gray-200 p-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex justify-center">
            <div className="flex items-center gap-4">
              <motion.button 
                onClick={repeatQuestion} 
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Repeat className="w-5 h-5 text-gray-600" />
              </motion.button>
              
              <motion.button 
                onClick={toggleMic} 
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                  micEnabled 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {micEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </motion.button>
              
              <motion.button 
                onClick={endCall} 
                className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 transition-colors text-white flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneOff className="w-7 h-7" />
              </motion.button>
              
              <motion.button 
                onClick={toggleVideo} 
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                  videoEnabled 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {videoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </motion.button>
              
              <motion.button 
                className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default InterviewSession