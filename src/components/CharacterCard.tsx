"use client";

import React from 'react';
import { Character } from '../data/characters';
import { useGame } from '../context/GameContext';
import { Brain, User, AlertCircle, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CharacterCardProps {
  charId: string;
  isSelectable?: boolean;
  isActive?: boolean;
  showResult?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  charId,
  isSelectable = false,
  isActive = false,
  showResult = false,
}) => {
  const { roundCharacters, selectCharacter, setUserAccusation, updateNotes } = useGame();
  
  const rc = roundCharacters.find(c => c.character.id === charId);
  if (!rc) return null;

  const { character, assignedIdentity, userAccusation, notes } = rc;

  // Render initials or a geometric background in place of placeholder image
  const getAvatarFallback = () => {
    const colors = [
      "from-amber-500/20 to-orange-500/10 border-amber-500/30",
      "from-cyan-500/20 to-blue-500/10 border-cyan-500/30",
      "from-fuchsia-500/20 to-purple-500/10 border-fuchsia-500/30",
      "from-emerald-500/20 to-teal-500/10 border-emerald-500/30"
    ];
    // Hash id to pick a color
    const hash = character.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colorClass = colors[hash % colors.length];

    return (
      <div className={`w-full h-full rounded-xl bg-gradient-to-br ${colorClass} border flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
        {/* Abstract futuristic geometry */}
        <div className="absolute w-24 h-24 rounded-full border border-white/5 -top-6 -right-6 animate-pulse" />
        <div className="absolute w-16 h-16 rounded-full border border-white/5 -bottom-6 -left-6" />
        
        {/* Solstice lighting metaphor representation */}
        <div className="absolute top-4 left-4 flex gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
        </div>

        {userAccusation === 'ai' && (
          <Brain className="w-12 h-12 text-indigo-400/60 stroke-[1.5]" />
        )}
        {userAccusation === 'human' && (
          <User className="w-12 h-12 text-amber-400/60 stroke-[1.5]" />
        )}
        {userAccusation === null && (
          <HelpCircle className={`w-12 h-12 text-zinc-600 stroke-[1.5] ${assignedIdentity === 'ai' && !showResult ? 'animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] opacity-80' : ''}`} />
        )}
        
        {/* Subtle AI Tell: Very faint random scanline for AI characters (only visible before reveal) */}
        {assignedIdentity === 'ai' && !showResult && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-10 mix-blend-overlay pointer-events-none" />
        )}
        
        <span className="text-[10px] tracking-wider uppercase font-mono text-zinc-500 mt-2 relative z-10">Dossier #{hash}</span>
      </div>
    );
  };

  const handleCardClick = () => {
    if (isSelectable) {
      selectCharacter(character.id);
    }
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className={`glass-panel rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${
        isSelectable ? 'cursor-pointer hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5' : ''
      } ${isActive ? 'border-amber-500/60 glow-border-warm bg-amber-950/5' : ''}`}
      whileHover={isSelectable ? { y: -4 } : {}}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Upper Area: Portrait & Name */}
      <div>
        <div className="w-full h-36 relative mb-4">
          {getAvatarFallback()}
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-zinc-100 text-lg leading-tight">{character.name}</h3>
            <p className="text-xs text-amber-400/80 font-mono mt-0.5">{character.role}</p>
          </div>
          {/* Status Indicators */}
          {!showResult && userAccusation && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${
              userAccusation === 'ai' 
                ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30' 
                : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
            }`}>
              {userAccusation}
            </span>
          )}
        </div>
        <p className="text-zinc-400 text-xs mt-3 leading-relaxed min-h-[48px]">{character.bio}</p>
      </div>

      {/* Middle/Bottom Area: Interaction or Reveal */}
      <div className="mt-5 border-t border-zinc-800/60 pt-4">
        {showResult ? (
          // Reveal State
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">Actual Mind:</span>
              <span className={`flex items-center gap-1 text-xs font-bold uppercase font-mono px-2 py-0.5 rounded ${
                assignedIdentity === 'ai' ? 'bg-indigo-950 text-indigo-400 border border-indigo-500/20' : 'bg-amber-950 text-amber-400 border border-amber-500/20'
              }`}>
                {assignedIdentity === 'ai' ? <Brain className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                {assignedIdentity}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400 font-mono">Your Guess:</span>
              <span className="text-xs font-mono font-semibold uppercase">
                {userAccusation || 'none'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs mt-2 pt-1 border-t border-zinc-900/60">
              {userAccusation === assignedIdentity ? (
                <div className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Correct Identification</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-rose-400">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Judgement Error</span>
                </div>
              )}
            </div>

            <div className="text-[11px] text-zinc-400 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/40 mt-1">
              <span className="font-mono text-zinc-300 font-semibold block mb-0.5">Signature Tell:</span>
              {assignedIdentity === 'ai' ? character.tells.ai : character.tells.human}
            </div>
          </div>
        ) : isSelectable ? (
          // Lobby Selection Mode
          <button 
            onClick={handleCardClick}
            className={`w-full py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 uppercase ${
              isActive 
                ? 'bg-amber-500 text-zinc-950 font-bold glow-border-warm' 
                : 'bg-zinc-800/60 text-zinc-300 border border-zinc-700/40 hover:bg-zinc-700/60'
            }`}
          >
            {isActive ? 'Verifying Terminal' : 'Initiate Terminal'}
          </button>
        ) : (
          // Accusation/Notes screen
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block mb-2">Classify Signature</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setUserAccusation(character.id, 'human')}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-mono transition-all border ${
                    userAccusation === 'human'
                      ? 'bg-amber-950/60 text-amber-300 border-amber-500/50 glow-border-warm font-bold'
                      : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-300'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Human
                </button>
                <button
                  onClick={() => setUserAccusation(character.id, 'ai')}
                  className={`py-2 rounded-xl flex items-center justify-center gap-1.5 text-xs font-mono transition-all border ${
                    userAccusation === 'ai'
                      ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/50 glow-border-cool font-bold'
                      : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-indigo-300'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  AI Mind
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 block mb-1.5">Observation Log</span>
              <textarea
                value={notes}
                onChange={(e) => updateNotes(character.id, e.target.value)}
                placeholder="Log dialogue tells, inconsistencies, or details..."
                className="w-full text-xs font-mono bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-2.5 h-20 text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 resize-none transition-all"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
