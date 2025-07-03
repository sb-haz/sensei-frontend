'use client'

import { useState } from 'react'
import { Atom, Menu, X } from 'lucide-react'

interface NavbarProps {
    scrolled: boolean;
}

export default function Navbar({ scrolled }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <nav className="w-full bg-white">
                <div className="w-full px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <Atom className="w-8 h-8 text-blue-600" />
                                    <span className="text-xl font-bold text-gray-900">Interview Sensei</span>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                Pricing
                            </a>
                            <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                Features
                            </a>
                            <a href="#faq" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                                FAQs
                            </a>
                            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                Get Started
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 pb-4">
                            <div className="flex flex-col gap-4">
                                <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium">
                                    Pricing
                                </a>
                                <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium">
                                    Features
                                </a>
                                <a href="#faq" className="text-gray-600 hover:text-blue-600 font-medium">
                                    FAQs
                                </a>
                                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Floating Dock-style Navigation */}
            <div className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
        transition-all duration-300 ease-in-out
        ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
        hidden md:block
      `}>
                <div className="bg-white/90 backdrop-blur-sm rounded-full px-8 py-3 shadow-lg flex items-center gap-8">
                    <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        Pricing
                    </a>
                    <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        Features
                    </a>
                    <a href="#faq" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                        FAQs
                    </a>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium">
                        Get Started
                    </button>
                </div>
            </div>
        </>
    )
}