import React, { useState, useCallback, useEffect } from 'react';
import { geminiService } from './services/geminiService';
import { ChatInterface } from './components/ChatInterface';
import { InputArea } from './components/InputArea';
import { Message } from './types';
import { RefreshCw, Moon, Sun } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const botMessageId = uuidv4();
    const initialBotMessage: Message = {
      id: botMessageId,
      role: 'model',
      content: '', 
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, initialBotMessage]);

    try {
      let accumulatedText = '';
      const stream = geminiService.sendMessageStream(content);

      for await (const chunk of stream) {
        accumulatedText += chunk;
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === botMessageId 
              ? { ...msg, content: accumulatedText }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Failed to generate response", error);
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === botMessageId 
            ? { ...msg, content: "عذراً يا صاحبي، حصلت مشكلة صغيرة. جرب تاني بعد شوية.", isError: true }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    if (messages.length > 0 && window.confirm("تحب نبدأ صفحة جديدة؟")) {
      geminiService.resetChat();
      setMessages([]);
    }
  };

  return (
    <div className="flex flex-col h-full text-slate-800 dark:text-slate-100 font-cairo">
      {/* Header - Floating Glass */}
      <header className="absolute top-4 left-4 right-4 z-50 rounded-2xl glass px-6 py-3 flex items-center justify-between shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300">
        <div className="flex items-center gap-3">
          {/* Creative Logo */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-full blur-lg opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse-slow"></div>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500 rounded-xl flex items-center justify-center text-white shadow-xl relative z-10 transform group-hover:scale-105 transition-transform duration-300 ring-2 ring-white/20 overflow-hidden">
                {/* Futuristic 'A' Logo */}
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                   {/* Abstract A Frame */}
                   <path d="M3.5 20L12 3L20.5 20" className="opacity-100" />
                   
                   {/* The Core (Pulsing Dot) */}
                   <circle cx="12" cy="14" r="2.5" fill="white" stroke="none" className="animate-pulse" />
                   
                   {/* Orbital Ring (Subtle tech feel) */}
                   <path d="M12 14 m -5.5, 0 a 5.5,5.5 0 1,0 11,0 a 5.5,5.5 0 1,0 -11,0" strokeWidth="1" className="opacity-40" strokeDasharray="3 3" />
                </svg>
                
                {/* Shine effect */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-b from-white/20 to-transparent rotate-45 transform translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700"></div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="font-bold text-xl leading-none tracking-tight font-cairo flex items-center gap-2">
              <span className="bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 gradient-text text-transparent">ABORAYA</span>
            </h1>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase opacity-90">AI Assistant</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={toggleTheme}
                className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-xl transition-all active:scale-95"
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
                onClick={handleReset}
                className={`p-2.5 rounded-xl transition-all active:scale-95 ${
                    messages.length > 0 
                    ? 'text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' 
                    : 'text-slate-300 dark:text-slate-700 cursor-not-allowed opacity-50'
                }`}
                disabled={messages.length === 0}
            >
                <RefreshCw size={20} />
            </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden relative flex flex-col pt-24 pb-4">
        <ChatInterface 
          messages={messages} 
          isLoading={isLoading} 
          onSendMessage={handleSendMessage}
        />
      </main>

      {/* Input Area */}
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;