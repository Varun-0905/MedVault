'use client'
import React from 'react'
import Link from 'next/link'
import { HeroHeader } from './header'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'

export default function HeroSection() {
    return (
        <div className="relative min-h-screen bg-[#050505] overflow-hidden text-white selection:bg-teal-500/30">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-900/20 blur-[120px] mix-blend-screen animate-blob" />
                <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
            </div>

            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

            <HeroHeader />

            <main className="relative z-10 flex items-center justify-center min-h-[90vh] pt-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    
                    {/* Left Column: Text & CTA */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, staggerChildren: 0.2 }}
                        className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                        >
                            <Sparkles className="w-4 h-4 text-teal-400" />
                            <span className="text-sm font-medium tracking-wide text-gray-300">MedVault Next-Gen is Live</span>
                        </motion.div>

                        <motion.h1 
                            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
                        >
                            Mental Wellness for <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-indigo-400">
                                Every Student.
                            </span>
                        </motion.h1>

                        <motion.p 
                            className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        >
                            Empowering higher education with AI-driven support, completely confidential counseling, and data-driven insights to foster campus-wide wellbeing.
                        </motion.p>

                        <motion.div 
                            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
                        >
                            <Link href="/anonymous-session" className="w-full sm:w-auto">
                                <button className="group relative w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Get Help Anonymously
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </Link>

                            <Link href="#psychoeducation" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-white bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
                                    Explore Resources
                                </button>
                            </Link>
                        </motion.div>

                        <motion.div 
                            className="mt-12 flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500 font-medium"
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#050505] bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-lg z-${10-i}`}>
                                        <span className="text-xs text-white">U{i}</span>
                                    </div>
                                ))}
                            </div>
                            <p>Trusted by 100+ Universities</p>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Floating Cards / 3D Visualization */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block h-[600px] w-full"
                    >
                        {/* Main Glass Card */}
                        <motion.div 
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start">
                                <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                                    <ShieldCheck className="text-teal-400 w-6 h-6" />
                                </div>
                                <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold">
                                    Encrypted
                                </div>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Anonymous Session Active</h3>
                                <p className="text-gray-400 text-sm">Your data is completely private. You are talking to MindBuddy AI.</p>
                            </div>
                            
                            {/* Mock Chat Interface */}
                            <div className="space-y-3">
                                <div className="w-3/4 h-10 bg-white/5 rounded-r-2xl rounded-tl-2xl ml-auto border border-white/5" />
                                <div className="w-5/6 h-16 bg-teal-500/10 rounded-l-2xl rounded-tr-2xl border border-teal-500/20" />
                            </div>
                        </motion.div>

                        {/* Floating Small Card 1 */}
                        <motion.div 
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -left-8 top-20 w-48 bg-white/10 border border-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-xl"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-sm font-semibold">24/7 Availability</span>
                            </div>
                        </motion.div>

                        {/* Floating Small Card 2 */}
                        <motion.div 
                            animate={{ y: [-15, 15, -15] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                            className="absolute -right-4 bottom-24 w-56 bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl rounded-2xl p-5 shadow-xl"
                        >
                            <div className="text-3xl font-bold text-indigo-400 mb-1">90%</div>
                            <span className="text-xs text-gray-300">Reduction in stigma through anonymous routing.</span>
                        </motion.div>

                    </motion.div>
                </div>
            </main>
        </div>
    )
}
