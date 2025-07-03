'use client'

import { useState, useEffect } from 'react'
import { Mic, Sparkles, Atom } from 'lucide-react'

const interviewScript = [
    {
        question: "Can you walk me through how you would design a scalable caching system?",
        suggestion: "Focus on these key points: cache invalidation strategies, distributed architecture, and handling race conditions.",
    },
    {
        question: "Tell me about a complex AWS infrastructure you designed.",
        suggestion: "Mention: multi-region setup, auto-scaling patterns, disaster recovery strategy, and cost optimization.",
    },
    {
        question: "How would you architect a real-time data processing pipeline?",
        suggestion: "Structure your response around: stream processing, fault tolerance, data consistency, and monitoring approach.",
    }
]

type SenseiStatus = 'idle' | 'transcribing' | 'processing' | 'suggesting'

export const PreviewBox = () => {
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [currentSuggestion, setCurrentSuggestion] = useState('')
    const [questionIndex, setQuestionIndex] = useState(0)
    const [phase, setPhase] = useState<'typing' | 'suggesting' | 'fading'>('typing')
    const [speaking, setSpeaking] = useState(false)
    const [senseiStatus, setSenseiStatus] = useState<SenseiStatus>('idle')

    useEffect(() => {
        const runDemo = async () => {
            // Reset states
            setCurrentQuestion('')
            setCurrentSuggestion('')
            setSpeaking(true)
            setPhase('typing')
            setSenseiStatus('transcribing')

            // Type out the question
            const question = interviewScript[questionIndex].question
            for (let i = 0; i <= question.length; i++) {
                setCurrentQuestion(question.slice(0, i))
                await new Promise(r => setTimeout(r, 30))
            }

            // Quick transition to processing
            setSpeaking(false)
            setSenseiStatus('processing')
            await new Promise(r => setTimeout(r, 100))

            // Show the suggestion
            setPhase('suggesting')
            setSenseiStatus('suggesting')
            const suggestion = interviewScript[questionIndex].suggestion
            for (let i = 0; i <= suggestion.length; i++) {
                setCurrentSuggestion(suggestion.slice(0, i))
                await new Promise(r => setTimeout(r, 5))
            }

            // Keep visible for a moment
            await new Promise(r => setTimeout(r, 2000))

            // Fade out
            setPhase('fading')
            setSenseiStatus('idle')
            await new Promise(r => setTimeout(r, 1000))

            // Move to next question
            setQuestionIndex((prev) => (prev + 1) % interviewScript.length)
        }

        runDemo()
    }, [questionIndex])

    return (
        <div className="preview-box relative bg-white rounded-2xl shadow-xl border border-blue-100 h-[550px] flex flex-col">
            {/* Decorative background */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-purple-200 rounded-full blur-3xl opacity-20" />

            {/* Video Call Section */}
            <div className="relative p-6 flex-none">
                {/* Status Bar */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-slate-500">Live Interview</span>
                    </div>
                    {/* <div className="text-sm text-slate-500">00:05:23</div> */}
                </div>

                {/* Video Previews Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Interviewer Video */}
                    <div className={`relative aspect-video bg-slate-100 rounded-lg overflow-hidden transition-all duration-300 ${speaking ? 'ring-2 ring-green-500 ring-offset-2' : ''}`}>
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-300" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            {/* Grey circle */}
                            {/* <div className="w-7 h-7 rounded-full bg-slate-400" /> */}
                            {/* Img */}
                            <img
                                src="person_9.jpg"
                                alt="Interviewer"
                                className="w-7 h-7 rounded-full object-cover"
                            />
                            <div className="px-2 py-1 rounded-full bg-slate-700/50 backdrop-blur-sm">
                                <span className="text-xs text-white font-medium">Interviewer</span>
                            </div>
                        </div>
                        {speaking && (
                            <div className="absolute top-3 left-3">
                                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-green-400/90 backdrop-blur-sm">
                                    <Mic className="w-3 h-3 text-green-900" />
                                    <span className="text-xs text-green-900 font-medium">Speaking</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Video */}
                    <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-200 to-slate-300" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                            {/* Grey circle */}
                            {/* <div className="w-7 h-7 rounded-full bg-slate-400" /> */}
                            {/* Img */}
                            <img
                                src="person_7.jpg"
                                alt="Interviewer"
                                className="w-7 h-7 rounded-full object-cover"
                            />
                            <div className="px-2 py-1 rounded-full bg-slate-700/50 backdrop-blur-sm">
                                <span className="text-xs text-white font-medium">You</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 border-dashed" />

            {/* Sensei Assistant Section */}
            <div className="relative p-6 flex-1 overflow-hidden">
                {/* Sensei Status Bar */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Atom className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm text-blue-600">Interview Sensei</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-sm text-slate-600">
                            {senseiStatus === 'transcribing' && 'Transcribing...'}
                            {senseiStatus === 'processing' && 'Processing...'}
                            {senseiStatus === 'suggesting' && 'Suggesting response...'}
                        </span>
                    </div>
                </div>

                {/* Interview Content */}
                <div className={`space-y-4 transition-opacity duration-500 ${phase === 'fading' ? 'opacity-0' : 'opacity-100'}`}>
                    {/* Question */}
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-slate-700">Input Question</span>
                        </div>
                        <p className="text-slate-700">{currentQuestion}</p>
                    </div>

                    {/* Suggestion */}
                    {phase === 'suggesting' && (
                        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-600">Sensei Response</span>
                            </div>
                            <p className="text-slate-700">{currentSuggestion}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}