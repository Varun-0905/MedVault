'use client'
import React, { useState } from 'react'
import { HeroHeader } from '@/components/header'
import FooterSection from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ResourcesPage = () => {
    const [selectedResource, setSelectedResource] = useState(null)

    const resourceCategories = [
        {
            title: "Stress Management",
            icon: "🧠",
            color: "blue",
            description: "Evidence-informed tools for exam pressure, workload stress, and nervous system regulation.",
            resources: [
                {
                    title: "Progressive Muscle Relaxation Guide",
                    type: "Video",
                    duration: "15 min",
                    description: "Step-by-step guidance to release physical tension and calm the body.",
                    recommendedFor: "physical tension, restlessness, end-of-day stress",
                    videoUrl: "https://www.youtube.com/embed/1nZEdqcGVzo",
                    fullContent: "Progressive Muscle Relaxation (PMR) is a deep relaxation technique that has been used effectively to control stress and anxiety, relieve insomnia, and reduce symptoms of certain types of chronic pain. By systematically tensing and then relaxing different muscle groups, you can learn to monitor and control muscular tension."
                },
                {
                    title: "Breathing Exercises for Anxiety",
                    type: "Audio",
                    duration: "10 min",
                    description: "Guided breathing techniques for quick, steadying relief.",
                    recommendedFor: "stress spikes, pre-exam nerves, racing thoughts",
                    spotifyUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u",
                    fullContent: "Start by sitting in a comfortable position. Close your eyes. Inhale slowly through your nose for 4 seconds, feeling your stomach expand. Hold your breath for 4 seconds. Exhale slowly through your mouth for 4 seconds, feeling your stomach contract. Hold for another 4 seconds before inhaling again. Repeat this cycle 4 times."
                },
                {
                    title: "Time Management Workbook",
                    type: "PDF",
                    pages: "24 pages",
                    description: "Practical planning strategies for heavy academic workloads.",
                    recommendedFor: "overload, missed deadlines, competing priorities",
                    fullContent: "This workbook covers the Eisenhower Matrix (Urgent vs. Important), the Pomodoro Technique (25 minutes of focused work followed by a 5-minute break), and time blocking. To use this effectively, start your week by writing down all your deadlines. Block out time for sleep and meals first, then classes, then study blocks."
                },
                {
                    title: "Mindfulness for Students",
                    type: "Article",
                    readTime: "8 min",
                    description: "Simple mindfulness practices to lower daily stress.",
                    recommendedFor: "daily stress, mental clutter, difficulty focusing",
                    fullContent: "Mindfulness doesn't require sitting still for hours. It can be practiced while walking to class or eating a meal. The core concept is returning your attention to the present moment without judgment. When your mind wanders to the exam next week, gently note 'thinking about the future' and return your focus to the feeling of your feet on the ground."
                }
            ]
        },
        {
            title: "Anxiety & Depression",
            icon: "💚",
            color: "green",
            description: "Understand symptoms and learn coping strategies that support anxious or low mood states.",
            resources: [
                {
                    title: "Understanding Anxiety Disorders",
                    type: "Video",
                    duration: "12 min",
                    description: "Clear overview of how anxiety works and common patterns.",
                    recommendedFor: "persistent worry, panic symptoms, overthinking",
                    videoUrl: "https://www.youtube.com/embed/l5A6Nn125F4",
                    fullContent: "Anxiety is a natural response to stress, but when it becomes overwhelming or persistent, it can interfere with daily life. This video explains the difference between normal anxiety and anxiety disorders, the role of the amygdala in triggering the 'fight or flight' response, and when to seek professional help."
                },
                {
                    title: "Depression Self-Assessment Tool",
                    type: "Interactive",
                    duration: "5 min",
                    description: "Self-check to reflect on mood, energy, and interest levels.",
                    recommendedFor: "low mood, loss of interest, fatigue",
                    fullContent: "The PHQ-9 is a widely used screening tool for depression. It asks about symptoms over the past two weeks, such as little interest or pleasure in doing things, feeling down or hopeless, sleep issues, and low energy. While not a diagnostic tool, it can help you understand whether you should reach out to a healthcare provider."
                },
                {
                    title: "Cognitive Behavioral Techniques",
                    type: "Article",
                    readTime: "15 min",
                    description: "Learn CBT-style strategies for shifting unhelpful thought loops.",
                    recommendedFor: "negative self-talk, anxious thinking, rumination",
                    fullContent: "Cognitive Behavioral Therapy (CBT) focuses on the connection between thoughts, feelings, and behaviors. A key technique is 'cognitive restructuring'. When you have a negative thought (e.g., 'I'm going to fail this class'), identify the cognitive distortion (e.g., 'catastrophizing'). Challenge the thought by asking for evidence: 'What evidence do I have that I will fail? I passed the last quiz.' Replace it with a more balanced thought: 'This class is challenging, but I am putting in the effort to learn the material.'"
                },
                {
                    title: "Building Support Networks",
                    type: "Guide",
                    readTime: "10 min",
                    description: "How to build support and communicate needs clearly.",
                    recommendedFor: "loneliness, isolation, needing encouragement",
                    fullContent: "Isolation can worsen symptoms of anxiety and depression. Building a support network takes time. Start by identifying 'safe' people in your life—friends, family, or mentors who listen without judgment. Communicate your needs clearly: 'I don't need advice right now, I just need someone to listen.' Consider joining campus clubs or support groups to meet peers with shared experiences."
                }
            ]
        },
        {
            title: "Academic Wellness",
            icon: "🎯",
            color: "purple",
            description: "Balance academic performance with well-being through habits that reduce pressure.",
            resources: [
                {
                    title: "Study-Life Balance Planner",
                    type: "Tool",
                    duration: "Interactive",
                    description: "Build a realistic weekly plan with study blocks and recovery time.",
                    recommendedFor: "overcommitment, poor schedule balance",
                    fullContent: "Effective study-life balance requires intentional planning. 1) Audit your time for a week to see where it actually goes. 2) Schedule 'non-negotiables' first: 7-9 hours of sleep, regular meals, and exercise. 3) Block out class times and work shifts. 4) Distribute study hours realistically—avoiding marathon 8-hour sessions. 5) Schedule 'guilt-free' downtime where studying is not allowed."
                },
                {
                    title: "Dealing with Academic Pressure",
                    type: "Video",
                    duration: "18 min",
                    description: "Strategies for exam stress, performance anxiety, and expectations.",
                    recommendedFor: "exam stress, fear of failure, pressure",
                    videoUrl: "https://www.youtube.com/embed/81SYil_E1vM",
                    fullContent: "Academic pressure often stems from a fear of failure or letting others down. This video explores how to reframe perfectionism, set process-oriented goals rather than outcome-oriented goals, and manage test anxiety through grounding techniques before and during exams."
                },
                {
                    title: "Goal Setting Framework",
                    type: "Worksheet",
                    pages: "8 pages",
                    description: "SMART goals to reduce overwhelm and increase clarity.",
                    recommendedFor: "low motivation, unclear priorities",
                    fullContent: "Instead of a vague goal like 'Get better grades', use the SMART framework. Specific: 'I will improve my Chemistry grade from a C to a B.' Measurable: 'I will track my quiz scores weekly.' Achievable: 'I will attend tutoring twice a week.' Relevant: 'This is required for my major.' Time-bound: 'I will achieve this by the end of the semester.' Breaking large tasks into micro-tasks reduces overwhelm."
                },
                {
                    title: "Motivation and Procrastination",
                    type: "Article",
                    readTime: "15 min",
                    description: "Understand procrastination triggers and build momentum.",
                    recommendedFor: "avoidance, low drive, task paralysis",
                    fullContent: "Procrastination is rarely an issue of laziness; it is almost always an issue of emotion regulation. We avoid tasks that make us feel anxious, bored, or incompetent. To break the cycle: 1) Forgive yourself for past procrastination. 2) Make the task smaller—just write one sentence. 3) Use the '5-Minute Rule': agree to work on a task for just 5 minutes. Usually, the momentum carries you forward."
                }
            ]
        },
        {
            title: "Relationship Skills",
            icon: "🤝",
            color: "orange",
            description: "Build healthier communication and boundaries for stronger social connections.",
            resources: [
                {
                    title: "Effective Communication Guide",
                    type: "Article",
                    readTime: "12 min",
                    description: "Frameworks for clear, respectful conversations.",
                    recommendedFor: "difficult talks, misunderstandings",
                    fullContent: "Use 'I' statements to express feelings without blaming. Instead of 'You never listen to me', try 'I feel unheard when I'm speaking and you're looking at your phone.' Practice active listening by summarizing what the other person said before responding. Avoid the 'Four Horsemen' of communication breakdown: criticism, contempt, defensiveness, and stonewalling."
                },
                {
                    title: "Conflict Resolution Strategies",
                    type: "Video",
                    duration: "20 min",
                    description: "Step-by-step methods to de-escalate conflict.",
                    recommendedFor: "roommate conflicts, recurring arguments",
                    videoUrl: "https://www.youtube.com/embed/KY5TWVz5ZDU",
                    fullContent: "Conflict is inevitable, but combat is optional. When tensions run high, take a 20-minute timeout to let your nervous system calm down before continuing the discussion. Focus on the specific issue at hand rather than bringing up past grievances. Look for the underlying need beneath the anger—often, it's a need for respect, safety, or understanding."
                },
                {
                    title: "Setting Healthy Boundaries",
                    type: "Guide",
                    readTime: "15 min",
                    description: "Practical scripts and exercises for boundary setting.",
                    recommendedFor: "people-pleasing, burnout, feeling drained",
                    fullContent: "Boundaries are how we teach people how to treat us. Physical boundaries protect your space and body. Emotional boundaries protect your feelings and energy. Time boundaries protect how you spend your day. Learn to say 'No' without over-explaining. A complete sentence is: 'I can't commit to that right now.' Remember, setting a boundary might upset someone, but your well-being is worth protecting."
                },
                {
                    title: "Building Emotional Intelligence",
                    type: "Article",
                    readTime: "10 min",
                    description: "Learn to name, understand, and regulate emotions.",
                    recommendedFor: "emotional overwhelm, relationship strain",
                    fullContent: "Emotional Intelligence (EQ) involves self-awareness, self-regulation, motivation, empathy, and social skills. Start by expanding your emotional vocabulary—moving beyond 'good' and 'bad' to specific terms like 'frustrated', 'content', 'anxious', or 'relieved'. When you feel an intense emotion, pause and ask yourself: 'What is this feeling telling me? What do I need right now?'"
                }
            ]
        },
        {
            title: "Work-Life Balance",
            icon: "⚖️",
            color: "yellow",
            description: "Protect your energy and time with sustainable routines and boundaries.",
            resources: [
                {
                    title: "Priority Setting Matrix",
                    type: "Tool",
                    duration: "Interactive",
                    description: "Eisenhower Matrix for clear, fast prioritization.",
                    recommendedFor: "too many tasks, decision fatigue",
                    fullContent: "The Eisenhower Matrix divides tasks into four quadrants: 1) Urgent & Important (Do immediately—e.g., paper due tomorrow). 2) Important, Not Urgent (Schedule it—e.g., studying for a final next month). 3) Urgent, Not Important (Delegate or push back—e.g., responding to non-essential emails). 4) Not Urgent & Not Important (Eliminate—e.g., endless scrolling). Spend most of your time in Quadrant 2 to prevent crises."
                },
                {
                    title: "Self-Care Checklist",
                    type: "Checklist",
                    items: "50 items",
                    description: "Quick daily and weekly habits to protect your wellbeing.",
                    recommendedFor: "low energy, no routine, neglecting needs",
                    fullContent: "True self-care is often unglamorous. It's drinking water, going to bed on time, and doing your laundry so you have clean clothes. Create a 'Minimum Viable Routine' for low-energy days: brushing teeth, drinking one glass of water, eating one piece of fruit, and stepping outside for 2 minutes. When you have more energy, add more robust practices like exercise or journaling."
                },
                {
                    title: "Burnout Prevention Guide",
                    type: "Video",
                    duration: "15 min",
                    description: "Spot early warning signs and adjust before burnout hits.",
                    recommendedFor: "exhaustion, cynicism, reduced performance",
                    videoUrl: "https://www.youtube.com/embed/Z0oDInzL-g8",
                    fullContent: "Burnout is characterized by three dimensions: emotional exhaustion, depersonalization (cynicism), and a reduced sense of personal accomplishment. It's an occupational phenomenon, not a medical condition. Prevention requires managing the 'burnout cycle' by completing the stress response cycle (through physical activity, crying, laughing, or creative expression) even if the stressor remains."
                },
                {
                    title: "Energy Management Techniques",
                    type: "Article",
                    readTime: "12 min",
                    description: "Build routines for steady energy and focus.",
                    recommendedFor: "midday slumps, inconsistent focus",
                    fullContent: "Time management is useless without energy management. You have four main energy reserves: physical, emotional, mental, and spiritual. Protect your physical energy with sleep and nutrition. Protect emotional energy by setting boundaries. Protect mental energy by doing deep work when your focus naturally peaks (often in the morning). Notice when your energy dips and take active recovery breaks, not just 'scrolling' breaks."
                }
            ]
        },
        {
            title: "Crisis Resources",
            icon: "🆘",
            color: "red",
            description: "Know when and how to seek urgent help for yourself or a friend.",
            resources: [
                {
                    title: "Crisis Hotline Directory",
                    type: "Directory",
                    updated: "Weekly",
                    description: "24/7 crisis lines and immediate chat support options.",
                    recommendedFor: "immediate support or urgent safety concerns",
                    fullContent: "INDIA HELPLINES:\n- Vandrevala Foundation: 9999 666 555 (24x7)\n- iCall: 9152987821 (Mon-Sat, 10 AM-8 PM)\n- NIMHANS Toll Free: 080-46110007\n\nUS/INTERNATIONAL:\n- Suicide & Crisis Lifeline: Call or text 988\n- Crisis Text Line: Text HOME to 741741\n- The Trevor Project (LGBTQ youth): Call 866-488-7386 or text START to 678-678."
                },
                {
                    title: "Emergency Action Plan",
                    type: "Template",
                    pages: "4 pages",
                    description: "Create a simple safety plan and warning-sign checklist.",
                    recommendedFor: "safety planning and crisis preparation",
                    fullContent: "A Safety Plan is a written list of coping strategies and resources to use during a crisis. It should include: 1) Warning signs that a crisis is developing. 2) Internal coping strategies (things I can do by myself). 3) People and social settings that provide distraction. 4) People I can ask for help. 5) Professionals or agencies I can contact during a crisis. 6) Making the environment safe (removing access to lethal means)."
                },
                {
                    title: "When to Seek Professional Help",
                    type: "Guide",
                    readTime: "8 min",
                    description: "Signs it may be time to reach out for professional care.",
                    recommendedFor: "symptoms lasting 2+ weeks or getting worse",
                    fullContent: "You don't need to be in crisis to seek therapy. However, professional help is strongly recommended if: your symptoms have lasted longer than two weeks; they are interfering with your daily life, academics, or relationships; you are turning to unhealthy coping mechanisms (like substance abuse); or you are having thoughts of self-harm or suicide. Therapy is a tool for maintenance, not just emergencies."
                },
                {
                    title: "Helping a Friend in Distress",
                    type: "Video",
                    duration: "10 min",
                    description: "How to safely support a peer experiencing a mental health crisis.",
                    recommendedFor: "supporting others, recognizing warning signs",
                    videoUrl: "https://www.youtube.com/embed/nCrjvRXUMq4",
                    fullContent: "If you're worried about a friend: 1) Ask directly. Asking 'Are you thinking about suicide?' does NOT plant the idea in their head; it shows you care. 2) Listen without judgment or immediate advice. 3) Keep them safe by staying with them. 4) Connect them with professional help. 5) Follow up. Remember, you are a friend, not a therapist—do not carry the burden alone. Involve professionals if you fear for their safety."
                }
            ]
        },
        {
            title: "Mindfulness & Meditation",
            icon: "🧘",
            color: "blue",
            description: "Practices to anchor yourself in the present moment and cultivate inner peace.",
            resources: [
                {
                    title: "5-Minute Grounding Meditation",
                    type: "Audio",
                    duration: "5 min",
                    description: "A quick reset to center your mind during a busy day.",
                    recommendedFor: "overwhelm, dissociation, quick breaks",
                    spotifyUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY",
                    fullContent: "Find a quiet place to sit. Feel your feet on the floor. Take a deep breath in, and let it out with a sigh. Bring your attention to the sounds around you—just notice them without labeling them as 'good' or 'bad'. Now bring your attention to your physical body. Notice points of contact with the chair. Take three more deep breaths, and when you are ready, gently open your eyes."
                },
                {
                    title: "The Body Scan Technique",
                    type: "Video",
                    duration: "15 min",
                    description: "A comprehensive relaxation method to release stored physical tension.",
                    recommendedFor: "physical tension, pre-sleep routine",
                    videoUrl: "https://www.youtube.com/embed/7cjIEMr3vEQ",
                    fullContent: "The body scan involves mentally sweeping your body from head to toe. Lie down comfortably. Bring your awareness to your toes. Notice any sensations—warmth, coolness, tingling, or nothing at all. Breathe into that area, and as you exhale, imagine releasing any tension. Slowly move up your body—feet, ankles, calves, knees, thighs, hips, stomach, chest, back, hands, arms, shoulders, neck, face, and head."
                },
                {
                    title: "Mindful Eating Guide",
                    type: "Article",
                    readTime: "7 min",
                    description: "How to transform meals into a grounding mindfulness practice.",
                    recommendedFor: "rushed eating, digestive issues, anxiety",
                    fullContent: "Mindful eating turns a daily necessity into a mindfulness practice. Start by eliminating distractions (no phone, TV, or reading). Before you take a bite, notice the colors, textures, and smells of your food. Take a bite and chew slowly. Notice the flavors and how they change. Pay attention to the physical sensations of swallowing. Check in with your body's hunger and fullness cues periodically during the meal."
                },
                {
                    title: "Introduction to Loving-Kindness",
                    type: "Guide",
                    readTime: "10 min",
                    description: "A meditation style focused on cultivating compassion for self and others.",
                    recommendedFor: "self-criticism, resentment, anger",
                    fullContent: "Loving-Kindness Meditation (Metta) involves silently repeating phrases of goodwill. Start with yourself: 'May I be happy. May I be healthy. May I be safe. May I live with ease.' Then direct these phrases to someone you love. Next, direct them to a neutral person (like a barista). Then, direct them to a difficult person in your life. Finally, direct the phrases to all living beings."
                }
            ]
        },
        {
            title: "Sleep Hygiene",
            icon: "💤",
            color: "purple",
            description: "Optimize your sleep environment and routines for restorative rest.",
            resources: [
                {
                    title: "The Science of Healthy Sleep",
                    type: "Video",
                    duration: "14 min",
                    description: "Understand circadian rhythms and the stages of sleep.",
                    recommendedFor: "chronic fatigue, poor sleep quality",
                    videoUrl: "https://www.youtube.com/embed/pwaWilO_Pig",
                    fullContent: "Sleep is not just 'powering down'—it's a highly active biological process essential for memory consolidation, emotional regulation, and physical repair. This video explains the architecture of sleep (REM and Non-REM stages), the role of melatonin and cortisol in your circadian rhythm, and why consistency in sleep timing is more important than total duration."
                },
                {
                    title: "Building a Wind-Down Routine",
                    type: "Checklist",
                    items: "10 items",
                    description: "A step-by-step guide to preparing your brain for sleep.",
                    recommendedFor: "racing thoughts at bedtime, insomnia",
                    fullContent: "A good wind-down routine starts 60-90 minutes before bed. 1) Dim the lights in your home to signal melatonin production. 2) Turn off all screens (phone, laptop, TV) or use blue-light blockers. 3) Engage in a relaxing activity: reading a physical book, light stretching, or listening to calm music. 4) Prepare for the next day (lay out clothes, pack bag) to reduce morning anxiety. 5) Keep your bedroom cool (around 65°F/18°C)."
                },
                {
                    title: "Managing Late-Night Anxiety",
                    type: "Article",
                    readTime: "8 min",
                    description: "Techniques to quiet a racing mind when trying to sleep.",
                    recommendedFor: "overthinking at night, sleep onset insomnia",
                    fullContent: "When the lights go out, distractions fade, and anxiety often spikes. If you can't sleep after 20 minutes, get out of bed. Your bed should be associated only with sleep, not with tossing and turning in frustration. Go to a dimly lit room and do a boring activity (like reading a dry textbook) until you feel sleepy, then return to bed. Keep a 'worry journal' by your bed—if a thought keeps you awake, write it down to deal with tomorrow."
                },
                {
                    title: "Caffeine and Sleep",
                    type: "Guide",
                    readTime: "5 min",
                    description: "How substances impact your sleep architecture.",
                    recommendedFor: "afternoon slumps, dependency on energy drinks",
                    fullContent: "Caffeine blocks adenosine, a chemical that builds up in your brain throughout the day to make you feel sleepy. Caffeine has a half-life of about 5-7 hours. This means if you have a coffee at 4 PM, half of that caffeine is still active in your brain at 9 PM or 10 PM. To optimize sleep, aim to stop consuming caffeine at least 8-10 hours before your target bedtime. Also, be aware that alcohol may help you fall asleep faster, but it severely disrupts REM sleep."
                }
            ]
        },
        {
            title: "Identity & Self-Discovery",
            icon: "🎭",
            color: "orange",
            description: "Navigate questions of self-worth, belonging, and personal values.",
            resources: [
                {
                    title: "Overcoming Impostor Syndrome",
                    type: "Video",
                    duration: "16 min",
                    description: "Understand why you feel like a fraud and how to combat it.",
                    recommendedFor: "self-doubt, feeling unqualified, perfectionism",
                    videoUrl: "https://www.youtube.com/embed/eqhUHyVpAwE",
                    fullContent: "Impostor syndrome is the internalized fear of being exposed as a 'fraud' despite evidence of success. It disproportionately affects high achievers and marginalized groups. To combat it: 1) Recognize the feelings when they arise. 2) Separate feelings from facts—feeling incompetent does not make you incompetent. 3) Talk about it—you'll find many peers feel the exact same way. 4) Keep a 'brag file' of your accomplishments and positive feedback."
                },
                {
                    title: "Values Clarification Exercise",
                    type: "Interactive",
                    duration: "20 min",
                    description: "Identify your core values to guide difficult decisions.",
                    recommendedFor: "feeling lost, major life transitions, indecision",
                    fullContent: "Values are different from goals. A goal is a destination (getting a degree); a value is a direction (valuing learning or curiosity). When your actions align with your core values, you feel a sense of integrity and purpose. Take time to review a list of values (e.g., authenticity, creativity, compassion, leadership, stability) and narrow them down to your top 3-5. Use these as a compass when facing difficult choices."
                },
                {
                    title: "Practicing Self-Compassion",
                    type: "Article",
                    readTime: "12 min",
                    description: "How to treat yourself with the kindness you offer friends.",
                    recommendedFor: "harsh inner critic, self-blame, perfectionism",
                    fullContent: "Dr. Kristin Neff defines self-compassion as having three components: 1) Self-kindness vs. self-judgment (being warm and understanding toward ourselves when we suffer, fail, or feel inadequate). 2) Common humanity vs. isolation (recognizing that suffering and personal inadequacy are part of the shared human experience). 3) Mindfulness vs. over-identification (taking a balanced approach to our negative emotions so that feelings are neither suppressed nor exaggerated). Next time you fail, ask yourself: 'What would I say to a good friend in this situation?'"
                },
                {
                    title: "Navigating Life Transitions",
                    type: "Guide",
                    readTime: "10 min",
                    description: "Strategies for coping with major changes like college or graduation.",
                    recommendedFor: "homesickness, graduation anxiety, shifting roles",
                    fullContent: "Transitions—even positive ones like starting college or graduating—involve loss. You are losing a familiar routine, an old identity, or proximity to friends. It is normal to feel grief alongside excitement. Establish new routines quickly to create a sense of safety. Give yourself a timeline: tell yourself, 'I am not going to evaluate whether I made the right choice until I have been here for three months.' Growth happens at the edges of our comfort zones."
                }
            ]
        }
    ]

    const getColorClasses = (color) => {
        const colorMap = {
            blue: "bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
            green: "bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
            purple: "bg-purple-100 text-purple-600 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
            orange: "bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
            yellow: "bg-yellow-100 text-yellow-600 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
            red: "bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
        }
        return colorMap[color] || "bg-gray-100 text-gray-600 border-gray-200"
    }

    return (
        <div className="min-h-screen bg-background">
            <HeroHeader />
            
            {/* Header Section */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Mental Health Resource Library
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                            Free, evidence-based mental health resources designed by professionals. 
                            Access comprehensive guides, tools, and support materials anytime, anywhere.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <span className="px-3 py-1 bg-primary/10 rounded-full font-medium">✓ No Login Required</span>
                            <span className="px-3 py-1 bg-primary/10 rounded-full font-medium">✓ Always Free</span>
                            <span className="px-3 py-1 bg-primary/10 rounded-full font-medium">✓ Expert Reviewed</span>
                            <span className="px-3 py-1 bg-primary/10 rounded-full font-medium">✓ 36+ Resources</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-16">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="space-y-24">
                        {resourceCategories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="space-y-8">
                                <div className="text-center">
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${getColorClasses(category.color)}`}>
                                        <span className="text-3xl">{category.icon}</span>
                                    </div>
                                    <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                        {category.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {category.resources.map((resource, resourceIndex) => (
                                        <div key={resourceIndex} className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col">
                                            <div className="flex items-start justify-between mb-3">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getColorClasses(category.color)}`}>
                                                    {resource.type}
                                                </span>
                                                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                                    {resource.duration || resource.readTime || resource.pages || resource.items || resource.updated}
                                                </span>
                                            </div>
                                            <h3 className="font-bold text-lg mb-2 text-card-foreground line-clamp-2">{resource.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-4 flex-grow">{resource.description}</p>
                                            {resource.recommendedFor && (
                                                <div className="bg-muted/50 rounded-lg p-3 mb-4">
                                                    <p className="text-xs text-muted-foreground font-medium">
                                                        <span className="text-primary font-semibold mr-1">Best for:</span> 
                                                        {resource.recommendedFor}
                                                    </p>
                                                </div>
                                            )}
                                            <Button 
                                                className="w-full mt-auto"
                                                onClick={() => setSelectedResource(resource)}
                                            >
                                                Access Resource
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency Resources Section */}
            <section className="py-16 bg-red-50 dark:bg-red-900/10 border-t border-red-100 dark:border-red-900/30">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 text-red-600 dark:text-red-400">Emergency Mental Health Resources</h2>
                        <p className="text-lg text-muted-foreground">
                            If you're experiencing a mental health emergency, please reach out immediately.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center shadow-sm">
                            <h3 className="font-bold text-lg mb-2">Vandrevala Foundation</h3>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">9999 666 555</p>
                            <p className="text-sm text-muted-foreground">Free, 24/7 crisis support in India</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center shadow-sm">
                            <h3 className="font-bold text-lg mb-2">NIMHANS Toll Free</h3>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">080-46110007</p>
                            <p className="text-sm text-muted-foreground">National helpline for psychosocial support</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center shadow-sm">
                            <h3 className="font-bold text-lg mb-2">Global 988 Lifeline</h3>
                            <p className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">988</p>
                            <p className="text-sm text-muted-foreground">Free, confidential support in US/Canada</p>
                        </div>
                    </div>
                    
                    <div className="text-center mt-8">
                        <p className="text-sm text-muted-foreground mb-4">
                            Remember: Seeking help is a sign of strength, not weakness.
                        </p>
                        <Button asChild variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20">
                            <Link href="/consult">
                                Start Anonymous Chat Session
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <FooterSection />

            {/* Modal for viewing resource */}
            {selectedResource && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-start justify-between p-6 border-b bg-muted/30">
                            <div className="pr-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                                        {selectedResource.type}
                                    </span>
                                    <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                        {selectedResource.duration || selectedResource.readTime || selectedResource.pages || selectedResource.items || selectedResource.updated}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">{selectedResource.title}</h3>
                                {selectedResource.recommendedFor && (
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        <span className="font-semibold text-primary">Best for:</span> {selectedResource.recommendedFor}
                                    </p>
                                )}
                            </div>
                            <button 
                                onClick={() => setSelectedResource(null)}
                                className="text-muted-foreground hover:text-foreground transition p-2 rounded-full hover:bg-muted"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>

                        {/* Body content based on resource type */}
                        <div className="p-6 md:p-8 overflow-y-auto flex-1">
                            
                            {/* Video Player */}
                            {selectedResource.type.toLowerCase() === 'video' && selectedResource.videoUrl && (
                                <div className="mb-8 rounded-xl overflow-hidden shadow-md bg-black aspect-video w-full">
                                    <iframe 
                                        src={selectedResource.videoUrl} 
                                        title={selectedResource.title}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                            {/* Spotify Audio Player */}
                            {selectedResource.type.toLowerCase() === 'audio' && selectedResource.spotifyUrl && (
                                <div className="mb-8 rounded-xl overflow-hidden shadow-md w-full">
                                    <iframe 
                                        style={{ borderRadius: "12px" }} 
                                        src={selectedResource.spotifyUrl} 
                                        width="100%" 
                                        height="152" 
                                        frameBorder="0" 
                                        allowFullScreen="" 
                                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            )}

                            {/* Main Content Area */}
                            <div className="prose prose-blue dark:prose-invert max-w-none">
                                <p className="text-lg md:text-xl font-medium text-foreground/80 leading-relaxed border-l-4 border-primary pl-6 py-2 mb-8 bg-muted/20 rounded-r-lg">
                                    {selectedResource.description}
                                </p>
                                
                                <div className="text-base md:text-lg text-foreground/90 leading-relaxed space-y-6">
                                    {/* Render the full content, splitting by newlines for paragraphs */}
                                    {selectedResource.fullContent ? (
                                        selectedResource.fullContent.split('\n\n').map((paragraph, idx) => {
                                            if (paragraph.includes(':\n-') || paragraph.includes(':\n -')) {
                                                const [heading, ...items] = paragraph.split('\n');
                                                return (
                                                    <div key={idx} className="my-6">
                                                        <h4 className="font-bold text-xl mb-3">{heading}</h4>
                                                        <ul className="list-disc pl-6 space-y-2">
                                                            {items.map((item, i) => (
                                                                <li key={i}>{item.replace(/^-\s*/, '')}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                );
                                            }
                                            return <p key={idx} className="whitespace-pre-wrap">{paragraph}</p>;
                                        })
                                    ) : (
                                        <p>Detailed content is not available for this resource yet.</p>
                                    )}
                                </div>
                                
                                {/* Action Buttons for specific types */}
                                {(selectedResource.type.toLowerCase() === 'interactive' || selectedResource.type.toLowerCase() === 'tool') && (
                                    <div className="mt-10 p-6 bg-primary/5 border border-primary/20 rounded-xl text-center">
                                        <h4 className="text-xl font-bold mb-3">Interactive Tool Ready</h4>
                                        <p className="text-muted-foreground mb-6">Launch the interactive module to begin your guided session.</p>
                                        <Button size="lg" className="px-8 font-semibold">
                                            Start Interactive Session
                                        </Button>
                                    </div>
                                )}
                                
                                {(selectedResource.type.toLowerCase() === 'pdf' || selectedResource.type.toLowerCase() === 'worksheet' || selectedResource.type.toLowerCase() === 'template') && (
                                    <div className="mt-10 p-6 bg-muted/30 border border-border rounded-xl text-center flex flex-col items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground mb-4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                        <h4 className="text-xl font-bold mb-2">{selectedResource.title}.pdf</h4>
                                        <Button className="mt-4 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                            Download Document
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 md:p-6 border-t bg-muted/20 flex justify-between items-center">
                            <p className="text-xs text-muted-foreground hidden sm:block">
                                MedVault Psychoeducation Hub • Evidence-based resources
                            </p>
                            <Button onClick={() => setSelectedResource(null)}>
                                Close Viewer
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResourcesPage
