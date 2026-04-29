'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your AI mental wellness coach. I can offer supportive guidance and practical coping tools, but I'm not a doctor. How are you feeling today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const payloadMessages = nextMessages.map((message) => ({
        role: message.type === 'user' ? 'user' : 'assistant',
        content: message.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to reach AI service');
      }

      const botResponse = {
        id: `assistant-${Date.now()}`,
        type: 'bot',
        content: data.content || data.response || "I'm here to support you. Could you tell me more about what you're experiencing?",
        suggestedActions: Array.isArray(data.suggestedActions) ? data.suggestedActions : [],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorResponse = {
        id: `error-${Date.now()}`,
        type: 'bot',
        content: error?.message || "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or if you're in crisis, contact 988 for immediate support.",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-500 text-sm">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">AI Mental Health Chat</h1>
              <p className="text-sm text-gray-600">Confidential 24/7 support</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg h-[600px] flex flex-col">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.suggestedActions?.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-gray-600">
                      {message.suggestedActions.map((action, index) => (
                        <li key={`${action.title}-${index}`}>
                          <span className="font-medium">{action.title}:</span> {action.description}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className={`text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex space-x-4">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message here..."
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows="2"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 px-6"
              >
                Send
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift+Enter for new line. This AI provides supportive guidance, not medical advice. In crisis, call 988.
            </p>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>This AI assistant provides supportive conversations and coping tips but is not a doctor or therapist. If you're experiencing a mental health emergency, please contact emergency services or call the National Suicide Prevention Lifeline at 988.</p>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}