import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { User, Copy, Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-start' : 'justify-end'} animate-slide-up group px-2`}>
      <div className={`flex max-w-[90%] md:max-w-[80%] ${isUser ? 'flex-row' : 'flex-row-reverse'} gap-4 items-end`}>
        
        {/* Avatar */}
        {isUser ? (
             <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-2 ring-white dark:ring-slate-900 transform transition-transform group-hover:scale-105">
                <User size={20} />
             </div>
        ) : (
             <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-2 ring-white dark:ring-slate-900 transform transition-transform group-hover:scale-105">
                <Sparkles size={20} fill="currentColor" className="text-emerald-100" />
            </div>
        )}

        {/* Bubble Content */}
        <div className="relative group/bubble flex flex-col gap-1">
            <div 
            className={`px-6 py-4 shadow-sm text-base md:text-lg leading-relaxed
                ${isUser 
                ? 'bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-[24px] rounded-tr-none shadow-indigo-500/10' 
                : 'glass-heavy text-slate-800 dark:text-slate-100 rounded-[24px] rounded-tl-none shadow-black/5'
                }
                ${message.isError ? '!bg-red-50 dark:!bg-red-900/30 !border-red-200 dark:!border-red-800 !text-red-600 dark:!text-red-300' : ''}
            `}
            >
            {isUser ? (
                <div className="whitespace-pre-wrap font-medium">{message.content}</div>
            ) : (
                <div className="prose prose-base md:prose-lg prose-slate dark:prose-invert max-w-none rtl:prose-p:text-right rtl:prose-headings:text-right prose-p:leading-loose prose-pre:bg-slate-900/50 prose-pre:backdrop-blur-md prose-pre:border prose-pre:border-white/10 prose-pre:shadow-inner prose-a:text-emerald-600 dark:prose-a:text-emerald-400">
                <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
            )}
            </div>
            
            {/* Actions (Only for bot) */}
            {!isUser && !message.isError && (
                <div className="flex justify-end opacity-0 group-hover/bubble:opacity-100 transition-all duration-300 px-2">
                    <button 
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors shadow-sm backdrop-blur-md text-xs font-medium"
                    >
                        {copied ? (
                            <>
                                <Check size={14} className="text-emerald-500" />
                                <span className="text-emerald-600 dark:text-emerald-400">تم النسخ</span>
                            </>
                        ) : (
                            <>
                                <Copy size={14} />
                                <span>نسخ</span>
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};