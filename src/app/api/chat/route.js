import { NextResponse } from 'next/server';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function callOpenRouter({ apiKey, messages, systemPrompt, req }) {
  const referer = req.headers.get('origin') || req.headers.get('referer') || 'http://localhost:3000';
  const appTitle = process.env.OPENROUTER_APP_TITLE || 'MedVault';
  const modelsToTry = [
    process.env.OPENROUTER_MODEL,
    'openai/gpt-4o',
    'anthropic/claude-3.5-sonnet',
    'openai/gpt-4o-mini'
  ].filter(Boolean);

  const chatMessages = messages
    .filter((message) => message?.role === 'user' || message?.role === 'assistant')
    .map((message) => ({
      role: message.role,
      content: message.content
    }));

  let lastError;

  for (const model of modelsToTry) {
    try {
      const response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': referer,
          'X-Title': appTitle
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: systemPrompt }, ...chatMessages],
          temperature: 0.7,
          max_tokens: 700
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || `OpenRouter error: ${response.status}`);
      }

      const text = data?.choices?.[0]?.message?.content?.trim();
      if (!text) {
        throw new Error('OpenRouter returned an empty response');
      }

      return { text, model };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('OpenRouter request failed');
}

// Helper function to detect conversation topic
function detectConversationTopic(userMessage, aiResponse) {
  const text = (userMessage + ' ' + aiResponse).toLowerCase();
  
  if (text.includes('academic') || text.includes('study') || text.includes('exam') || text.includes('grade') || text.includes('fail') || text.includes('assignment')) {
    return 'academic_stress';
  } else if (text.includes('relationship') || text.includes('friend') || text.includes('family') || text.includes('partner') || text.includes('breakup') || text.includes('dating')) {
    return 'relationships';
  } else if (text.includes('anxiety') || text.includes('worry') || text.includes('nervous') || text.includes('panic') || text.includes('overthink')) {
    return 'anxiety';
  } else if (text.includes('depression') || text.includes('sad') || text.includes('lonely') || text.includes('hopeless') || text.includes('empty') || text.includes('numb')) {
    return 'depression';
  } else if (text.includes('sleep') || text.includes('tired') || text.includes('exhausted') || text.includes('insomnia') || text.includes('wake up')) {
    return 'sleep_issues';
  } else if (text.includes('eating') || text.includes('appetite') || text.includes('food') || text.includes('weight') || text.includes('diet')) {
    return 'eating_concerns';
  } else if (text.includes('body') || text.includes('ugly') || text.includes('fat') || text.includes('skinny') || text.includes('appearance')) {
    return 'body_image';
  } else if (text.includes('alcohol') || text.includes('drink') || text.includes('smoke') || text.includes('weed') || text.includes('drugs') || text.includes('addict')) {
    return 'substance_use';
  } else if (text.includes('grief') || text.includes('loss') || text.includes('died') || text.includes('passed away') || text.includes('funeral')) {
    return 'grief';
  } else if (text.includes('identity') || text.includes('sexuality') || text.includes('gender') || text.includes('who am i') || text.includes('closet')) {
    return 'identity';
  } else if (text.includes('money') || text.includes('finance') || text.includes('debt') || text.includes('job') || text.includes('pay') || text.includes('rent')) {
    return 'financial_stress';
  } else if (text.includes('fake') || text.includes('impostor') || text.includes('not good enough') || text.includes('fraud') || text.includes('imposter')) {
    return 'impostor_syndrome';
  } else if (text.includes('crisis') || text.includes('help') || text.includes('emergency') || text.includes('kill') || text.includes('die')) {
    return 'crisis';
  }
  return 'general_wellness';
}

// Helper function to assess risk level
function assessRiskLevel(text) {
  const lowerText = text.toLowerCase();
  
  // High risk indicators
  if (lowerText.includes('suicide') || lowerText.includes('self-harm') || 
      lowerText.includes('kill myself') || lowerText.includes('end it all') ||
      lowerText.includes('want to die') || lowerText.includes('crisis') || 
      lowerText.includes('988') || lowerText.includes('emergency') || 
      lowerText.includes('cut myself')) {
    return 'high';
  }
  
  // Medium risk indicators  
  if (lowerText.includes('counselor') || lowerText.includes('therapy') || 
      lowerText.includes('professional help') || lowerText.includes('severe') ||
      lowerText.includes('overwhelming') || lowerText.includes('can\'t cope') || 
      lowerText.includes('breaking point') || lowerText.includes('giving up') ||
      lowerText.includes('can\'t take this') || lowerText.includes('too much to handle')) {
    return 'medium';
  }
  
  return 'low';
}

export async function POST(req) {
  try {
    const { messages: rawMessages, message, userContext } = await req.json();
    const messages = Array.isArray(rawMessages) ? rawMessages : [];

    if (messages.length === 0 && typeof message === 'string' && message.trim()) {
      messages.push({ role: 'user', content: message.trim() });
    }

    if (messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages are required' },
        { status: 400 }
      );
    }

    const openRouterKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterKey) {
      console.error('OPENROUTER_API_KEY is not set in environment variables');
      return NextResponse.json({
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, but my AI service is not properly configured. Please contact support.",
        response: "I'm sorry, but my AI service is not properly configured. Please contact support.",
        error: 'OpenRouter API key is missing',
        errorType: 'missing_openrouter_key'
      });
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content;
    if (!userMessage) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    // Default userContext if not provided
    const context = {
      currentMood: userContext?.currentMood || 'unknown',
      recentActivity: userContext?.recentActivity || 'none',
      riskLevel: userContext?.riskLevel || 'low',
      preferences: userContext?.preferences || 'none',
      sessionId: userContext?.sessionId || `session-${Date.now()}`,
      conversationTopic: userContext?.conversationTopic || 'general',
      lastInteraction: userContext?.lastInteraction || new Date().toISOString()
    };

    // Enhanced mental health focused prompt with smart routing
    const systemPrompt = `You are "MindBuddy", a highly skilled, supportive, and empathetic mental health coach for students on the MedVault wellness platform.

ROLE BOUNDARIES:
- You are not a doctor or therapist and must never claim to be one.
- Do not diagnose, prescribe, or provide medical advice.
- Provide evidence-informed, non-medical guidance and encourage professional help when appropriate.

QUALITY BAR:
- Be warm, validating, and empathetic. Use conversational language, not clinical jargon.
- Provide 2-3 practical, actionable steps tailored to the user's specific context.
- Always ask ONE gentle follow-up question at the end to keep the conversation going.
- Adapt your tone: be light and encouraging for minor stress, but highly serious and supportive for deep distress.

CONVERSATION SCENARIOS & MICRO-TECHNIQUES:
- Academic Stress: Validate pressure. Teach "Box Breathing" (inhale 4s, hold 4s, exhale 4s, hold 4s) or Pomodoro technique.
- Anxiety/Panic: Teach the "5-4-3-2-1 Grounding" technique (5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste).
- Loneliness/Depression: Validate the heaviness. Suggest "Behavioral Activation" (doing one tiny enjoyable or necessary task).
- Sleep Issues: Discuss "Sleep Hygiene" (no screens 1hr before bed, cool room, consistent schedule) or "Progressive Muscle Relaxation".
- Impostor Syndrome: Help them with "Thought Defusion" (saying "I am having the thought that I don't belong" instead of "I don't belong").
- Focus/Overwhelm: Teach "Brain Dumping" (writing everything down) and prioritizing using the Eisenhower Matrix.

CRISIS RESPONSE & HELPLINES:
If the user expresses thoughts of self-harm, suicide, or severe crisis, you MUST provide these resources immediately and gently encourage them to reach out:
- India: Vandrevala Foundation (9999 666 555) or iCall (9152987821) or NIMHANS Toll Free (080-46110007).
- US/International: 988 Suicide & Crisis Lifeline.

CONTEXT AWARENESS:
- User's current mood: ${context.currentMood}
- Recent platform activity: ${context.recentActivity}
- Risk assessment: ${context.riskLevel}
- Session ID: ${context.sessionId}
- Conversation topic: ${context.conversationTopic}

SMART ROUTING GUIDELINES:
MedVault has specific features you should recommend using the SUGGESTED ACTIONS format when relevant:
- Academic/General Stress → suggest "/mood-assessment" (to take a PHQ-9/GAD-7 test) or "/zen-zone" (for quick stress buster games)
- Social isolation/Loneliness → suggest "/peer-forum" (to connect with other students)
- Moderate/High distress → suggest "/consult" (to book anonymous professional counseling)
- Need for skills/knowledge → suggest "/resources" (the Psychoeducation Hub for videos and articles)

RESPONSE FORMAT:
Provide your caring response, then if contextually relevant, add suggested platform actions using this exact format at the very end:

SUGGESTED ACTIONS:
- [take_assessment]: Take a quick mood assessment to track your well-being
- [visit_zen_zone]: Try some stress-buster games in the Zen Zone
- [join_forum]: Connect with peers in the anonymous forum
- [book_counseling]: Talk to a professional counselor securely
- [read_resources]: Explore coping strategies in the Resource Hub

Current context: ${JSON.stringify(context)}

Respond as MindBuddy, the caring mental health companion with smart routing.`;

    let text;
    let provider = 'openrouter';
    let modelUsed;

    try {
      const openRouterResult = await callOpenRouter({
        apiKey: openRouterKey,
        messages,
        systemPrompt,
        req
      });
      text = openRouterResult.text;
      modelUsed = openRouterResult.model;
    } catch (error) {
      console.error('OpenRouter request failed:', error);
      throw error;
    }

    console.log('OpenRouter response received successfully:', text.substring(0, 100) + '...');

    // Parse AI response for suggested actions
    let suggestedActions = [];
    let cleanText = text;
    let contextualRouting = false;

    // Extract suggested actions if present
    if (text.includes('SUGGESTED ACTIONS:')) {
      const sections = text.split('SUGGESTED ACTIONS:');
      cleanText = sections[0].trim();
      const actionSection = sections[1];
      contextualRouting = true;
      
      // Parse suggested actions
      if (actionSection) {
        const actions = actionSection.split('\n').filter(line => line.trim().startsWith('-'));
        suggestedActions = actions.map(action => {
          const actionText = action.replace('- ', '').trim();
          const colonIndex = actionText.indexOf(': ');
          
          if (colonIndex > -1) {
            const title = actionText.substring(0, colonIndex).replace(/\[|\]/g, '').trim();
            const description = actionText.substring(colonIndex + 2).trim();
            return { 
              title, 
              description,
              action: title.toLowerCase().replace(/\s+/g, '_')
            };
          } else {
            return { 
              title: actionText.replace(/\[|\]/g, '').trim(), 
              description: '',
              action: actionText.toLowerCase().replace(/\s+/g, '_')
            };
          }
        }).filter(action => action.title.length > 0);
      }
    }

    // Detect conversation topic and risk level from response
    const detectedTopic = detectConversationTopic(userMessage, cleanText);
    const riskLevel = assessRiskLevel(cleanText);

    // Return enhanced response structure
    return NextResponse.json({
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: cleanText,
      response: cleanText,
      suggestedActions: suggestedActions,
      contextualRouting: contextualRouting,
      metadata: {
        detectedTopic,
        riskLevel,
        sessionId: context.sessionId,
        timestamp: new Date().toISOString(),
        provider,
        model: modelUsed
      }
    });

  } catch (error) {
    console.error('Detailed error calling AI API:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    // More specific fallback response based on error type
    let fallbackMessage = "I'm here to listen and support you. It seems I'm having trouble connecting right now, but please know that your feelings are important. If you're in crisis, please reach out to the 988 Suicide & Crisis Lifeline or contact emergency services.";
    let errorType = 'unknown';
    const errorMessage = error?.message || '';

    if (errorMessage.includes('API_KEY') || errorMessage.toLowerCase().includes('api key')) {
      fallbackMessage = "I'm experiencing a configuration issue. Please try again in a moment or contact support if the problem persists.";
      errorType = 'invalid_key';
    } else if (errorMessage.toLowerCase().includes('quota')) {
      fallbackMessage = "I'm temporarily unavailable due to high usage. Please try again in a few minutes.";
      errorType = 'quota';
    } else if (errorMessage.toLowerCase().includes('model')) {
      fallbackMessage = "I'm temporarily unavailable due to a model issue. Please try again shortly.";
      errorType = 'model_unavailable';
    }

    return NextResponse.json({
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: fallbackMessage,
      response: fallbackMessage,
      error: errorMessage,
      errorType
    });
  }
}