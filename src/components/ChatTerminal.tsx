"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { CharacterCard } from './CharacterCard';
import { Send, Cpu, Network, CornerDownLeft, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatTerminal: React.FC = () => {
  const { 
    activeCharacterId, 
    roundCharacters, 
    chatHistories, 
    sendMessage, 
    isThinking, 
    questionsLeft,
    isGeminiActive
  } = useGame();

  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const activeRoundChar = roundCharacters.find(rc => rc.character.id === activeCharacterId);
  const messages = activeCharacterId ? chatHistories[activeCharacterId] || [] : [];

  // Scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  if (!activeCharacterId || !activeRoundChar) {
    return (
      <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center text-center h-[550px]">
        <Cpu className="w-12 h-12 text-zinc-500 animate-pulse stroke-[1.2] mb-3" />
        <h3 className="text-lg font-bold text-zinc-300 font-mono">Archive Terminal Offline</h3>
        <p className="text-xs text-zinc-500 max-w-xs mt-1">
          Select an active mind profile on the left to establish a verification handshake.
        </p>
      </div>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking || questionsLeft <= 0) return;
    
    const textToSend = input;
    setInput('');
    await sendMessage(textToSend);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[550px]">
      
      {/* LEFT PANEL: CHAT INTERFACE (8/12 cols) */}
      <div className="lg:col-span-8 glass-panel rounded-2xl flex flex-col justify-between overflow-hidden h-[550px] border-zinc-800/80">
        
        {/* Terminal Header */}
        <div className="bg-zinc-950/60 px-5 py-4 border-b border-zinc-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-mono font-semibold text-zinc-200">
              Terminal: {activeRoundChar.character.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
              isGeminiActive 
                ? 'bg-amber-950/40 text-amber-400 border border-amber-500/20' 
                : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
            }`}>
              <Network className="w-3 h-3" />
              {isGeminiActive ? 'Gemini AI Core' : 'Cognitive Simulator'}
            </span>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
              const isUser = msg.role === 'user';
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed border ${
                    isUser 
                      ? 'bg-amber-500/10 text-amber-200 border-amber-500/20 rounded-tr-none' 
                      : 'bg-zinc-900/80 text-zinc-100 border-zinc-800/80 rounded-tl-none font-mono'
                  }`}>
                    {/* Message Header */}
                    <div className="flex items-center justify-between gap-6 mb-1 text-[10px] font-mono text-zinc-500">
                      <span>{isUser ? 'Player' : activeRoundChar.character.name}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    {/* Message Body */}
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isThinking && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl rounded-tl-none px-5 py-4">
                <span className="text-[10px] font-mono text-zinc-500 block mb-2">Analyzing quantum waves...</span>
                <div className="flex gap-1.5 items-center h-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 dot-blink" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 dot-blink" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 dot-blink" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-zinc-950/40 border-t border-zinc-900">
          {questionsLeft <= 0 ? (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-500/20 text-red-300 text-xs font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Solar cycle expired. Turn limit reached. Accuse characters and submit your judgement.</span>
            </div>
          ) : (
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${activeRoundChar.character.name} something... (e.g. "Who are you?", "Prove you are human")`}
                disabled={isThinking}
                className="w-full glass-input rounded-xl pl-4 pr-24 py-3.5 text-sm font-mono text-zinc-200"
                maxLength={150}
              />
              <div className="absolute right-2 flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-zinc-500 mr-1.5">
                  {input.length}/150
                </span>
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="bg-amber-500 hover:bg-amber-600 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-transparent text-zinc-950 font-bold p-2.5 rounded-lg border border-amber-400/20 transition-all cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
          <div className="flex items-center justify-between mt-2.5 px-1">
            <span className="text-[10px] text-zinc-500 font-mono flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> Press Enter to transmit
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">
              Limit 150 chars
            </span>
          </div>
        </div>

      </div>

      {/* RIGHT PANEL: CHARACTER DOSSIER & LOG NOTES (4/12 cols) */}
      <div className="lg:col-span-4 h-full">
        <CharacterCard charId={activeCharacterId} />
      </div>

    </div>
  );
};
