import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { Loader2, Zap, Code2, PenLine, Compass, Sparkles } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, onSendMessage }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const suggestions = [
    {
      icon: <Zap size={24} className="text-amber-500" />,
      label: "أفكار مجنونة",
      text: "اقترح عليا فكرة مشروع كريتيف من البيت",
      desc: "أفكار مشاريع، هدايا، وحلول خارج الصندوق.",
      bg: "bg-amber-500/10",
      border: "hover:border-amber-500/50"
    },
    {
      icon: <Code2 size={24} className="text-blue-500" />,
      label: "خبير برمجة",
      text: "اشرح لي كود React وكأني طفل عنده 10 سنين",
      desc: "مساعدة في الكود، تصحيح أخطاء، وشرح تقني.",
      bg: "bg-blue-500/10",
      border: "hover:border-blue-500/50"
    },
    {
      icon: <PenLine size={24} className="text-purple-500" />,
      label: "كاتب محترف",
      text: "اكتب لي بوست للسوشيال ميديا عن القهوة",
      desc: "كتابة إيميلات، مقالات، وبوستات جذابة.",
      bg: "bg-purple-500/10",
      border: "hover:border-purple-500/50"
    },
    {
      icon: <Compass size={24} className="text-emerald-500" />,
      label: "مستشارك الشخصي",
      text: "إزاي أقدر أنظم يومي وأزود إنتاجيتي؟",
      desc: "نصائح للحياة، تنظيم الوقت، وتطوير الذات.",
      bg: "bg-emerald-500/10",
      border: "hover:border-emerald-500/50"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 relative scroll-smooth no-scrollbar">
      <div className="max-w-4xl mx-auto min-h-full flex flex-col">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow py-8 text-center animate-fade-in relative z-10">
            
            {/* Creative Hero Section */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full blur-[60px] opacity-20 dark:opacity-40 animate-pulse-slow"></div>
                <div className="relative w-32 h-32 glass rounded-[2rem] flex items-center justify-center shadow-2xl animate-float border-2 border-white/50 dark:border-white/10 rotate-3 hover:rotate-6 transition-transform duration-500">
                    <Sparkles size={48} className="text-emerald-600 dark:text-emerald-400" />
                </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-emerald-800 to-slate-800 dark:from-white dark:via-emerald-300 dark:to-white mb-6 font-cairo leading-tight tracking-tight">
              أهلاً يا مبدع!
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-lg text-lg md:text-xl mb-12 leading-relaxed font-medium">
              أنا <span className="text-emerald-600 dark:text-emerald-400 font-bold decoration-wavy underline decoration-emerald-500/30">أبورية</span>، جاهز نكسر الدنيا مع بعض؟
              <br />
              اطلب أي حاجة، وهتلاقي الحل فوراً.
            </p>

            {/* Creative Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl px-2">
              {suggestions.map((item, index) => (
                <button
                  key={index}
                  onClick={() => onSendMessage(item.text)}
                  className={`group relative overflow-hidden glass p-6 rounded-3xl border border-white/20 dark:border-white/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-right flex items-start gap-4 ${item.border}`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                    {item.icon}
                  </div>
                  <div className="flex flex-col gap-1 z-10">
                    <span className="font-bold text-slate-800 dark:text-slate-100 text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{item.label}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</span>
                  </div>
                  
                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-8 py-4">
                {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
                ))}

                {isLoading && (
                <div className="flex w-full justify-end animate-slide-up px-4">
                    <div className="flex max-w-[85%] flex-row-reverse gap-4 items-end">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center shadow-sm">
                             <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                             </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            <div ref={bottomRef} className="h-6" />
          </>
        )}
      </div>
    </div>
  );
};