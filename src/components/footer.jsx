'use client'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const links = [
    { title: 'Features', href: '#features' },
    { title: 'Psychoeducation', href: '#psychoeducation' },
    { title: 'Zen Zone', href: '/zen-zone' },
    { title: 'Peer Forum', href: '/peer-forum' },
    { title: 'Anonymous Consult', href: '/consult' },
    { title: 'About', href: '#about' },
]

export default function FooterSection() {
    return (
        <footer className="relative bg-[#050505] pt-32 pb-16 border-t border-white/5 overflow-hidden font-sans">
            {/* Glowing orb background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-teal-500/10 blur-[120px] rounded-[100%] pointer-events-none" />
            
            <div className="mx-auto max-w-6xl px-6 relative z-10">
                
                {/* Massive CTA Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-32"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Ready to Transform <br /> Student Mental Health?
                    </h2>
                    <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                        Join leading educational institutions in creating a supportive environment where every student can thrive mentally and academically.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/register">
                            <button className="group relative px-8 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Get Started Today
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </Link>
                        <Link href="/consult">
                            <button className="px-8 py-4 rounded-full font-semibold text-white bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
                                Try Anonymous Chat
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Standard Footer Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pt-16 border-t border-white/10">
                    <div className="md:col-span-1">
                        <Link href="/" aria-label="go home" className="block size-fit mb-6">
                            <Logo />
                        </Link>
                        <p className="text-slate-400 text-sm">
                            Next-generation mental health support for the modern student.
                        </p>
                    </div>

                    <div className="md:col-span-2 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-white font-semibold mb-4">Platform</h4>
                            <div className="flex flex-col gap-3 text-sm">
                                {links.slice(0, 3).map((link, index) => (
                                    <Link key={index} href={link.href} className="text-slate-400 hover:text-white transition-colors w-fit">
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Support</h4>
                            <div className="flex flex-col gap-3 text-sm">
                                {links.slice(3, 6).map((link, index) => (
                                    <Link key={index} href={link.href} className="text-slate-400 hover:text-white transition-colors w-fit">
                                        {link.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-1 flex justify-start md:justify-end gap-4">
                        <Link href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path></svg>
                        </Link>
                        <Link href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path></svg>
                        </Link>
                        <Link href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path></svg>
                        </Link>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 text-slate-500 text-xs">
                    <span>© {new Date().getFullYear()} MedVault Platform. All rights reserved.</span>
                    <div className="flex gap-4 mt-4 sm:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
