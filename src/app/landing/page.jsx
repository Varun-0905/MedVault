'use client'
import React from 'react'
import HeroSection from '@/components/hero-section'
import FooterSection from '@/components/footer'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { LayoutGrid } from '@/components/ui/layout-grid'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Lock, Activity, Globe2, BookOpen, HeartPulse, Brain, MessagesSquare, Clock, Zap } from 'lucide-react'

const Landing = () => {
    const featureCards = [
        {
            id: 1,
            content: (
                <div>
                    <p className="font-bold md:text-4xl text-xl text-white">
                        AI-Guided Mental Health Support
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-300">
                        Intelligent chatbot providing 24/7 emotional support with multilingual capabilities. 
                        Early detection algorithms identify students at risk and provide immediate interventions.
                    </p>
                </div>
            ),
            className: "md:col-span-2",
            thumbnail: "/features/ai-guided-mental-health-support.png"
        },
        {
            id: 2,
            content: (
                <div>
                    <p className="font-bold md:text-4xl text-xl text-white">
                        Confidential Counseling
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-300">
                        Secure booking system for anonymous counseling sessions. 
                        Connect students with professional counselors while maintaining complete privacy.
                    </p>
                </div>
            ),
            className: "col-span-1",
            thumbnail: "/features/confidential-councelling.png"
        },
        {
            id: 3,
            content: (
                <div>
                    <p className="font-bold md:text-4xl text-xl text-white">
                        Psychoeducational Hub
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-300">
                        Comprehensive psychoeducational content covering stress management, 
                        coping strategies, and mental wellness in regional languages.
                    </p>
                </div>
            ),
            className: "col-span-1",
            thumbnail: "/features/educational-resource.png"
        },
        {
            id: 4,
            content: (
                <div>
                    <p className="font-bold md:text-4xl text-xl text-white">
                        Mood Assessment Tools
                    </p>
                    <p className="font-normal text-base text-white"></p>
                    <p className="font-normal text-base my-4 max-w-lg text-neutral-300">
                        Comprehensive mood analysis using standardized psychological screening tools like PHQ-9, GAD-7, 
                        and GHQ to assess problem severity levels and provide personalized intervention strategies.
                    </p>
                </div>
            ),
            className: "md:col-span-2",
            thumbnail: "/features/mood-analysis.png"
        },
    ];

    const testimonials = [
        "Transformed how we approach student mental health on campus",
        "Early intervention capabilities have helped us support at-risk students",
        "The multilingual support makes mental health accessible to all our students", 
        "Anonymous analytics provide crucial insights for policy decisions",
        "Students feel more comfortable seeking help through this platform",
        "Reduced stigma and increased counseling center efficiency significantly"
    ]

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-teal-500/30 font-sans">
            <HeroSection />
            
            {/* Stats / Problem Statement Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            The Crisis in Higher Education
                        </h2>
                        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                            Students face unprecedented mental health challenges, but existing support systems fall short. 
                            Our platform bridges the gap with culturally-aware, accessible, and data-driven solutions.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {[
                            { stat: "70%", text: "of students experience mental health challenges during college", icon: Activity, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
                            { stat: "24/7", text: "availability ensures support when students need it most", icon: Clock, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
                            { stat: "90%", text: "reduction in stigma through anonymous support options", icon: Shield, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                variants={fadeInUp}
                                className={`relative group p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/5 hover:${item.border} transition-all duration-500 hover:-translate-y-2`}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
                                    <item.icon className={`w-7 h-7 ${item.color}`} />
                                </div>
                                <div className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">{item.stat}</div>
                                <p className="text-slate-400 leading-relaxed">{item.text}</p>
                                
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            
            {/* Features Section with Layout Grid */}
            <section id="features" className="py-24 bg-[#0a0a0a] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
                <div className="container mx-auto px-6 max-w-7xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            Comprehensive Solution
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Discover our integrated platform designed specifically for higher education institutions to support student mental wellness
                        </p>
                    </motion.div>
                    
                    <div className="h-[1200px] md:h-[800px]">
                        <LayoutGrid cards={featureCards} />
                    </div>
                </div>
            </section>

            {/* Psychoeducation Hub Section */}
            <section id="psychoeducation" className="py-24 relative overflow-hidden">
                <div className="absolute -left-40 top-40 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -right-40 bottom-40 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            Psychoeducation Hub
                        </h2>
                        <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                            Evidence-based content designed by mental health professionals to help students understand and manage their mind.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            { title: "Stress Management", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", border: "group-hover:border-amber-500/30", items: ["Breathing exercises", "Time management", "Healthy coping"] },
                            { title: "Anxiety & Depression", icon: HeartPulse, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "group-hover:border-emerald-500/30", items: ["Early warning signs", "CBT techniques", "Support networks"] },
                            { title: "Academic Wellness", icon: BookOpen, color: "text-blue-400", bg: "bg-blue-500/10", border: "group-hover:border-blue-500/30", items: ["Study-life balance", "Academic pressure", "Goal setting"] },
                            { title: "Relationship Skills", icon: MessagesSquare, color: "text-pink-400", bg: "bg-pink-500/10", border: "group-hover:border-pink-500/30", items: ["Effective communication", "Conflict resolution", "Setting boundaries"] },
                            { title: "Work-Life Balance", icon: Activity, color: "text-violet-400", bg: "bg-violet-500/10", border: "group-hover:border-violet-500/30", items: ["Priority setting", "Self-care practices", "Preventing burnout"] },
                            { title: "Crisis Resources", icon: Shield, color: "text-red-400", bg: "bg-red-500/10", border: "group-hover:border-red-500/30", items: ["Recognizing crisis", "Emergency contacts", "Professional help"] }
                        ].map((cat, idx) => (
                            <motion.div 
                                key={idx}
                                variants={fadeInUp}
                                className={`group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 ${cat.border}`}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center mb-6`}>
                                    <cat.icon className={`w-7 h-7 ${cat.color}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white">{cat.title}</h3>
                                <ul className="space-y-3">
                                    {cat.items.map((item, i) => (
                                        <li key={i} className="flex items-center text-slate-400 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-600 mr-3 group-hover:bg-slate-400 transition-colors" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Button asChild size="lg" className="px-8 bg-white text-black hover:bg-gray-200 rounded-full font-semibold">
                            <Link href="/resources">
                                Access Full Resource Library
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Security & Privacy Section */}
            <section className="py-24 bg-[#0a0a0a] relative border-y border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            Privacy & Security First
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Enterprise-grade security built into the core. Complete anonymity guaranteed.
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {[
                            { title: "End-to-End Encrypted", icon: Lock, desc: "All communications are secured" },
                            { title: "Anonymous Access", icon: Shield, desc: "No identity required for help" },
                            { title: "HIPAA Compliant", icon: Activity, desc: "Healthcare standard protection" },
                            { title: "Regional Compliant", icon: Globe2, desc: "Adheres to local data laws" }
                        ].map((sec, i) => (
                            <motion.div key={i} variants={fadeInUp} className="p-8 text-center bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/5 transition-colors">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                                    <sec.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-white mb-2">{sec.title}</h3>
                                <p className="text-sm text-slate-400">{sec.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 overflow-hidden relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-teal-900/10 blur-[100px] rounded-[100%]" />
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                            Trusted Nationwide
                        </h2>
                    </motion.div>
                    
                    <div className="relative">
                        {/* Gradient Masks for Slider */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
                        
                        <InfiniteSlider 
                            gap={24} 
                            speed={40} 
                            speedOnHover={15}
                            className="py-8"
                        >
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={index} 
                                    className="flex-shrink-0 w-80 bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/10 transition-colors"
                                >
                                    <div className="flex items-start space-x-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="text-teal-400 text-sm">★</span>
                                        ))}
                                    </div>
                                    <p className="text-slate-300 italic mb-8 leading-relaxed">
                                        "{testimonial}"
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                            <Brain className="w-5 h-5 text-slate-300" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white text-sm">Student Affairs Director</p>
                                            <p className="text-xs text-slate-400">University #{index + 1}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </InfiniteSlider>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 bg-[#0a0a0a] border-t border-white/5">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
                                Our Mission
                            </motion.h2>
                            <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-6 leading-relaxed">
                                We believe every student deserves access to mental health support that is immediate, 
                                culturally sensitive, and free from stigma. Our platform was designed by mental health 
                                professionals who understand the unique challenges facing today's students.
                            </motion.p>
                            
                            <motion.div variants={fadeInUp} className="space-y-4 mt-8">
                                {[
                                    "Evidence-based mental health interventions",
                                    "Culturally inclusive and multilingual support",
                                    "Seamless integration with campus resources"
                                ].map((point, i) => (
                                    <div key={i} className="flex items-center space-x-4">
                                        <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-teal-400" />
                                        </div>
                                        <span className="text-slate-300">{point}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-indigo-500/20 rounded-[3rem] blur-2xl" />
                            <div className="relative bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-[3rem] p-10 shadow-2xl">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-teal-600 mb-2">50K+</div>
                                        <p className="text-sm font-medium text-slate-400">Students Supported</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-indigo-600 mb-2">100+</div>
                                        <p className="text-sm font-medium text-slate-400">Partner Institutions</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-4xl font-black text-white mb-2">24/7</div>
                                        <p className="text-sm font-medium text-slate-400">Available Support</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="text-4xl font-black text-white mb-2">98%</div>
                                        <p className="text-sm font-medium text-slate-400">Student Satisfaction</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <FooterSection />
        </div>
    )
}

export default Landing
