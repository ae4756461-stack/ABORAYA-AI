import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Sparkles } from 'lucide-react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <div className="p-4 md:p-6 z-20 flex justify-center w-full">
      <div className="w-full max-w-4xl relative">
        
        {/* Floating Capsule Container */}
        <form 
            onSubmit={handleSubmit} 
            className={`
                relative flex items-end gap-3 p-2.5 rounded-[32px] border transition-all duration-500
                glass-heavy shadow-2xl shadow-black/5 dark:shadow-black/20
                ${isLoading ? 'opacity-90 grayscale-[0.5]' : 'hover:border-emerald-400/30 dark:hover:border-emerald-500/20 hover:shadow-emerald-500/5'}
                focus-within:ring-4 focus-within:ring-emerald-500/10 focus-within:border-emerald-500/30
            `}
        >
          {/* Animated Icon */}
          <div className="pl-2 pb-3.5 text-slate-400 hidden sm:block">
             <div className={`p-2 rounded-full transition-colors duration-500 ${input.length > 0 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500' : ''}`}>
                <Sparkles size={20} className={`${input.length > 0 ? 'animate-pulse' : ''}`} />
             </div>
          </div>
          
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اكتب هنا.. أبورية معاك في أي حاجة ✨"
            className="w-full bg-transparent border-none focus:ring-0 resize-none py-4 px-2 max-h-[200px] text-slate-800 dark:text-slate-100 placeholder-slate-400/80 dark:placeholder-slate-500 text-lg focus:outline-none leading-relaxed custom-scrollbar font-medium"
            disabled={isLoading}
            dir="auto"
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`
                w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 transform mb-1
                ${!input.trim() || isLoading
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/40 hover:-translate-y-1 active:scale-95'
                }
            `}
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
               <SendHorizonal size={22} className={!input.trim() ? 'ml-0' : 'ml-0.5'} />
            )}
          </button>
        </form>
        
        {/* Disclaimer */}
        <div className="text-center mt-3 text-[10px] md:text-xs text-slate-400 dark:text-slate-500 font-medium opacity-70 tracking-wide">
          أبورية لسه بيتعلم، ممكن يغلط. راجع المعلومات المهمة.
        </div>
      </div>
    </div>
  );
};