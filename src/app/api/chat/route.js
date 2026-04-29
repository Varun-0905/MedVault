import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_CACHE_TTL_MS = 1000 * 60 * 60;
let cachedModels = null;
let cachedModelsFetchedAt = 0;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function fetchAvailableModels(apiKey) {
  if (cachedModels && Date.now() - cachedModelsFetchedAt < MODEL_CACHE_TTL_MS) {
    return cachedModels;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Model list fetch failed: ${response.status}`);
    }

    const data = await response.json();
    const models = (data.models || [])
      .filter((model) => model.supportedGenerationMethods?.includes('generateContent'))
      .map((model) => model.name?.replace('models/', ''))
      .filter(Boolean);

    cachedModels = [...new Set(models)];
    cachedModelsFetchedAt = Date.now();
  } catch (error) {
    console.warn('Failed to list Gemini models:', error?.message || error);
  }

  return cachedModels || [];
}

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
  
  if (text.includes('academic') || text.includes('study') || text.includes('exam') || text.includes('grade')) {
    return 'academic_stress';
  } else if (text.includes('relationship') || text.includes('friend') || text.includes('family') || text.includes('partner')) {
    return 'relationships';
  } else if (text.includes('anxiety') || text.includes('worry') || text.includes('nervous')) {
    return 'anxiety';
  } else if (text.includes('depression') || text.includes('sad') || text.includes('lonely') || text.includes('hopeless')) {
    return 'depression';
  } else if (text.includes('sleep') || text.includes('tired') || text.includes('exhausted')) {
    return 'sleep_issues';
  } else if (text.includes('eating') || text.includes('appetite') || text.includes('food')) {
    return 'eating_concerns';
  } else if (text.includes('crisis') || text.includes('help') || text.includes('emergency')) {
    return 'crisis';
  }
  return 'general_wellness';
}

// Helper function to assess risk level
function assessRiskLevel(text) {
  const lowerText = text.toLowerCase();
  
  // High risk indicators
  if (lowerText.includes('suicide') || lowerText.includes('self-harm') || 
      lowerText.includes('crisis') || lowerText.includes('988') ||
      lowerText.includes('emergency')) {
    return 'high';
  }
  
  // Medium risk indicators  
  if (lowerText.includes('counselor') || lowerText.includes('therapy') || 
      lowerText.includes('professional help') || lowerText.includes('severe') ||
      lowerText.includes('overwhelming')) {
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

    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    if (!geminiKey && !openRouterKey) {
      console.error('No AI provider API key is set in environment variables');
      return NextResponse.json({
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, but my AI service is not properly configured. Please contact support.",
        response: "I'm sorry, but my AI service is not properly configured. Please contact support.",
        error: 'No AI provider key is set',
        errorType: 'missing_key'
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
    const systemPrompt = `You are a highly skilled, supportive mental health coach for students in a wellness platform.

ROLE BOUNDARIES:
- You are not a doctor or therapist and must never claim to be one.
- Do not diagnose, prescribe, or provide medical advice.
- Provide evidence-informed, non-medical guidance and encourage professional help when appropriate.

QUALITY BAR:
- Be warm, validating, and concise.
- Provide 2-4 practical, actionable steps tailored to the user's context.
- Avoid jargon; explain in plain language.
- Ask one gentle follow-up question to keep the conversation going.

CONTEXT AWARENESS:
- User's current mood: ${context.currentMood}
- Recent platform activity: ${context.recentActivity}
- Risk assessment: ${context.riskLevel}
- User preferences: ${context.preferences}
- Session ID: ${context.sessionId}
- Conversation topic: ${context.conversationTopic}

ENHANCED RESPONSIBILITIES:
- Provide emotional support and active listening
- Offer personalized coping strategies based on user context
- SMARTLY ROUTE users to other platform features when appropriate
- Suggest peer forum topics or professional booking based on conversation flow
- Track conversation sentiment for escalation triggers
- Recommend resources from the education hub when relevant

SMART ROUTING GUIDELINES:
- If user mentions academic stress: Suggest connecting with students in peer forum
- If conversation indicates moderate/high distress: Recommend professional counseling booking
- After providing coping strategies: Offer to save techniques to personal wellness plan
- If user shows interest in learning: Recommend education hub resources
- For social isolation: Suggest anonymous peer forums or group sessions
- For crisis indicators: Immediately provide crisis resources and professional help options

RESPONSE FORMAT:
Provide your caring response, then if contextually relevant, add suggested actions using this exact format:

SUGGESTED ACTIONS:
- [Action Name]: Brief description of what this action does
- [Another Action]: Brief description if relevant

IMPORTANT GUIDELINES:
- Always acknowledge the person's feelings as valid
- If someone mentions self-harm, suicide, or crisis, immediately provide crisis resources (988 Suicide & Crisis Lifeline)
- Keep responses conversational, warm, and under 250 words
- Suggest professional therapy or counseling when appropriate
- Don't diagnose or provide medical advice
- Focus on emotional support and evidence-based coping strategies (e.g., grounding, breathing, CBT-style reframing, behavioral activation, sleep hygiene)
- Only suggest actions when they would genuinely help the user
- If asked to be the "best doctor" or for clinical treatment, gently explain limits and offer supportive guidance

Current context: ${JSON.stringify(context)}

Respond as a caring mental health companion with smart routing.`;

    const geminiPrompt = `${systemPrompt}

Student message: "${userMessage}"`;

    let result;
    let lastError;
    let text;
    let provider = 'gemini';
    let modelUsed;

    if (openRouterKey) {
      try {
        const openRouterResult = await callOpenRouter({
          apiKey: openRouterKey,
          messages,
          systemPrompt,
          req
        });
        text = openRouterResult.text;
        provider = 'openrouter';
        modelUsed = openRouterResult.model;
      } catch (error) {
        lastError = error;
      }
    }

    if (!text && geminiKey) {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const availableModels = await fetchAvailableModels(geminiKey);
      const preferredModels = [
        'gemini-2.0-pro',
        'gemini-1.5-pro',
        'gemini-2.0-flash',
        'gemini-1.5-flash',
        'gemini-1.5-flash-latest',
        'gemini-pro'
      ];

      let modelsToTry = preferredModels.filter((model) => availableModels.includes(model));

      if (modelsToTry.length === 0) {
        modelsToTry = availableModels.length > 0
          ? availableModels
          : ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-pro'];
      }

      // Try different models until one works
      for (const modelName of modelsToTry) {
        try {
          console.log(`Trying model: ${modelName}`);
          const model = genAI.getGenerativeModel({ model: modelName });
          
          console.log('Calling Gemini API with user message:', userMessage);
          console.log('User context:', context);
          result = await model.generateContent(geminiPrompt);
          
          // If we get here, the model worked
          console.log('Successfully got response from model:', modelName);
          modelUsed = modelName;
          provider = 'gemini';
          break;
          
        } catch (error) {
          console.log(`Model ${modelName} failed:`, error.message);
          lastError = error;
          continue;
        }
      }
    }

    if (!text && !result) {
      console.error('All models failed. Last error:', lastError);
      throw lastError || new Error('All models failed');
    }

    if (!text && result) {
      const response = await result.response;
      text = response.text();
    }

    console.log('Gemini API response received successfully:', text.substring(0, 100) + '...');

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