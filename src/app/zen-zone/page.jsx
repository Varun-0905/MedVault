'use client'
import React, { useState, useEffect, useRef } from 'react'
import { HeroHeader } from '@/components/header'
import FooterSection from '@/components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Flame, CircleDot, Gamepad2 } from 'lucide-react'

// --- 1. Box Breathing Component ---
const BoxBreathing = () => {
    const [phase, setPhase] = useState('inhale')
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setPhase(p => {
                    if (p === 'inhale') return 'hold1';
                    if (p === 'hold1') return 'exhale';
                    if (p === 'exhale') return 'hold2';
                    return 'inhale';
                });
            }, 4000); // 4 seconds per phase
        } else {
            clearInterval(interval);
            setPhase('inhale');
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const getScale = () => {
        if (!isActive) return 1;
        if (phase === 'inhale' || phase === 'hold1') return 1.5;
        return 1;
    }

    return (
        <div className="flex flex-col items-center justify-center h-96 w-full max-w-2xl mx-auto mt-8 relative">
            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                {/* Outer Ring */}
                <div className="absolute w-48 h-48 rounded-full border border-teal-500/30" />
                
                {/* Pulsing Sphere */}
                <motion.div 
                    className="absolute w-24 h-24 bg-teal-500/20 rounded-full"
                    animate={{ scale: getScale() }}
                    transition={{ duration: 4, ease: "linear" }}
                />
                <motion.div 
                    className="absolute w-16 h-16 bg-teal-500/80 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(20,184,166,0.4)] cursor-pointer hover:bg-teal-400 transition-colors"
                    animate={{ scale: getScale() }}
                    transition={{ duration: 4, ease: "linear" }}
                    onClick={() => setIsActive(!isActive)}
                >
                    <Wind className="text-white/80" />
                </motion.div>
            </div>
            
            <p className="text-slate-400 font-medium tracking-widest uppercase text-sm">
                {!isActive ? "Click sphere to begin" : "Sync with the sphere."}
            </p>
        </div>
    )
}

// --- 2. Thought Burner Component ---
const ThoughtBurner = () => {
    const [message, setMessage] = useState('')
    const [isBurning, setIsBurning] = useState(false)

    const handleBurn = () => {
        if (!message.trim()) return;
        setIsBurning(true)
        setTimeout(() => {
            setMessage('')
            setIsBurning(false)
        }, 2000)
    }

    return (
        <div className="flex flex-col items-center w-full max-w-xl mx-auto mt-8">
            <div className="flex flex-col items-center mb-8">
                <Flame className="text-red-500 w-8 h-8 mb-4" />
                <h3 className="text-xl font-medium text-slate-200 mb-1">Express a thought causing you distress.</h3>
                <p className="text-xs text-slate-500 tracking-widest font-semibold uppercase">ZERO DATA SAVED • PURGED ON BURN</p>
            </div>
            
            <div className="w-full relative">
                <AnimatePresence mode="wait">
                    {!isBurning ? (
                        <motion.div 
                            key="input"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ 
                                opacity: 0, 
                                y: -20, 
                                filter: "blur(10px) drop-shadow(0 0 20px #ef4444) brightness(200%)", 
                                transition: { duration: 1.5 }
                            }}
                            className="w-full flex flex-col gap-6"
                        >
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="I am overwhelmed by..."
                                className="w-full p-5 rounded-2xl bg-slate-900/80 border border-slate-800 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 outline-none text-slate-200 resize-none transition-colors"
                                rows={5}
                            />
                            <button 
                                onClick={handleBurn}
                                disabled={!message.trim()}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Send to the Fire
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="fire"
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            {/* Simple Fire Particles Simulation */}
                            <div className="relative w-full h-40">
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute bottom-0 w-8 h-8 rounded-full bg-orange-500 mix-blend-screen blur-md"
                                        initial={{ 
                                            left: `${Math.random() * 100}%`, 
                                            y: 0, 
                                            scale: Math.random() * 0.5 + 0.5,
                                            opacity: 0.8 
                                        }}
                                        animate={{ 
                                            y: -100 - Math.random() * 100,
                                            opacity: 0,
                                            scale: 0
                                        }}
                                        transition={{ 
                                            duration: 1 + Math.random(),
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

// --- 3. Bubble Wrap Component ---
const BubbleWrap = () => {
    const [bubbles, setBubbles] = useState([])
    const [score, setScore] = useState(0)

    const initGrid = () => {
        // Create a 6x10 grid (60 bubbles)
        const cols = 10;
        const rows = 6;
        const newBubbles = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                newBubbles.push({
                    id: `${r}-${c}`,
                    popped: false
                });
            }
        }
        setBubbles(newBubbles);
        setScore(0);
    }

    useEffect(() => {
        initGrid();
    }, [])

    const pop = (id) => {
        setBubbles(prev => {
            const newB = [...prev];
            const idx = newB.findIndex(b => b.id === id);
            if (idx !== -1 && !newB[idx].popped) {
                newB[idx] = { ...newB[idx], popped: true };
                setScore(s => s + 1);
            }
            return newB;
        });
    }

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto mt-8">
            <div className="flex justify-between w-full max-w-2xl mb-8 items-center px-4">
                <p className="text-slate-400 font-medium tracking-wide">POPPED <span className="text-teal-400 ml-2">{score}</span> / {bubbles.length}</p>
                <button onClick={initGrid} className="text-xs text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-wider font-semibold border border-slate-700 rounded-full px-4 py-2 hover:bg-slate-800">
                    Reset Board
                </button>
            </div>
            
            <div className="grid grid-cols-10 gap-3 md:gap-4 p-6 bg-slate-900/30 border border-slate-800/50 rounded-3xl">
                {bubbles.map((b) => (
                    <div 
                        key={b.id} 
                        className="w-8 h-8 md:w-12 md:h-12 relative flex items-center justify-center cursor-pointer"
                        onPointerDown={() => pop(b.id)}
                        onMouseEnter={(e) => {
                            if(e.buttons === 1) pop(b.id); // allow dragging to pop
                        }}
                    >
                        {!b.popped ? (
                            <div className="w-full h-full rounded-full bg-slate-800 border border-slate-700 shadow-inner hover:bg-slate-700 transition-colors" />
                        ) : (
                            <motion.div 
                                initial={{ scale: 1, opacity: 1 }}
                                animate={{ scale: 0.5, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-full h-full rounded-full bg-slate-800 border border-slate-700"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

// --- 4. Stress Buster Component ---
const StressBuster = () => {
    const [score, setScore] = useState(0)
    const [timeLeft, setTimeLeft] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [activeMole, setActiveMole] = useState(null)
    const gridRef = useRef(null)

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setIsActive(true);
    }

    useEffect(() => {
        let timer = null;
        let moleTimer = null;

        if (isActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(t => t - 1);
            }, 1000);

            const spawnMole = () => {
                const randomPos = Math.floor(Math.random() * 16);
                setActiveMole(randomPos);
                
                // Mole stays active for a random time between 600ms and 1200ms
                moleTimer = setTimeout(() => {
                    if (isActive) spawnMole();
                }, Math.random() * 600 + 600);
            };
            
            spawnMole();
        } else if (timeLeft === 0) {
            setIsActive(false);
            setActiveMole(null);
            clearTimeout(moleTimer);
        }

        return () => {
            clearInterval(timer);
            clearTimeout(moleTimer);
        }
    }, [isActive, timeLeft]);

    const hit = (idx) => {
        if (!isActive) return;
        if (idx === activeMole) {
            setScore(s => s + 1);
            setActiveMole(null); // hide immediately upon hit
        }
    }

    return (
        <div className="flex flex-col items-center w-full max-w-xl mx-auto mt-8">
            <div className="flex justify-between w-full mb-8 px-4 items-center">
                <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl">
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Time</p>
                    <p className="text-2xl font-mono text-slate-200">{timeLeft}s</p>
                </div>
                
                {!isActive && timeLeft === 0 ? (
                    <button 
                        onClick={startGame}
                        className="px-8 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-medium transition-colors shadow-[0_0_15px_rgba(13,148,136,0.3)]"
                    >
                        {score > 0 ? "Play Again" : "Start Game"}
                    </button>
                ) : (
                    <div className="px-8 py-3 opacity-0 cursor-default">Start Game</div> // Placeholder to keep layout stable
                )}

                <div className="bg-slate-900 border border-slate-800 px-6 py-3 rounded-2xl text-right">
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Score</p>
                    <p className="text-2xl font-mono text-teal-400">{score}</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4 p-6 bg-slate-900/50 border border-slate-800/80 rounded-3xl w-full aspect-square relative overflow-hidden" ref={gridRef}>
                {Array.from({ length: 16 }).map((_, i) => (
                    <div 
                        key={i}
                        onClick={() => hit(i)}
                        className={`w-full h-full rounded-2xl border flex items-center justify-center transition-all ${i === activeMole ? 'bg-red-500/20 border-red-500/50 cursor-pointer hover:bg-red-500/30 shadow-[inset_0_0_20px_rgba(239,68,68,0.2)]' : 'bg-slate-800/30 border-slate-800/50'}`}
                    >
                        <AnimatePresence>
                            {i === activeMole && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    className="w-12 h-12 bg-red-500 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                                />
                            )}
                        </AnimatePresence>
                    </div>
                ))}
                
                {!isActive && timeLeft === 0 && score > 0 && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center rounded-3xl">
                        <div className="text-center">
                            <h3 className="text-3xl font-bold text-slate-200 mb-2">Game Over</h3>
                            <p className="text-slate-400">You smashed <span className="text-teal-400 font-bold">{score}</span> stress targets!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default function ZenZone() {
    const [activeTab, setActiveTab] = useState('breathing')

    const tabs = [
        { id: 'breathing', label: 'Box Breathing', icon: Wind },
        { id: 'burner', label: 'Thought Burner', icon: Flame },
        { id: 'bubbles', label: 'Bubble Wrap', icon: CircleDot },
        { id: 'stress', label: 'Stress Buster', icon: Gamepad2 },
    ]

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-teal-500/30">
            <HeroHeader />
            
            <main className="pt-32 pb-24 px-6 min-h-screen flex flex-col">
                <div className="max-w-5xl mx-auto w-full">
                    
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                            The Zen <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-400">Zone.</span>
                        </h1>
                        <p className="text-slate-400 text-lg">
                            A safe, interactive digital space to ground your nervous system.
                        </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                                    activeTab === tab.id 
                                    ? 'bg-slate-800 text-teal-300 border border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.15)]' 
                                    : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                                }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span className="font-medium text-sm">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="w-full bg-[#111827] border border-slate-800 rounded-[2.5rem] p-8 md:p-12 min-h-[600px] shadow-2xl relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />
                        
                        <div className="relative z-10 w-full h-full">
                            <AnimatePresence mode="wait">
                                {activeTab === 'breathing' && (
                                    <motion.div key="breathing" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
                                        <BoxBreathing />
                                    </motion.div>
                                )}
                                {activeTab === 'burner' && (
                                    <motion.div key="burner" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
                                        <ThoughtBurner />
                                    </motion.div>
                                )}
                                {activeTab === 'bubbles' && (
                                    <motion.div key="bubbles" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
                                        <BubbleWrap />
                                    </motion.div>
                                )}
                                {activeTab === 'stress' && (
                                    <motion.div key="stress" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
                                        <StressBuster />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </main>
            
            <FooterSection />
        </div>
    )
}
