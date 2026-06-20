"use client";

import React from 'react';
import { useGame } from '../context/GameContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const SolsticeDial: React.FC = () => {
  const { questionsLeft, maxQuestions } = useGame();
  
  // Calculate percentage of day remaining
  const percentage = questionsLeft / maxQuestions; // 1.0 down to 0.0
  
  // Calculate angles for the sun
  // Noon (maxQuestions left) starts at 90 degrees (zenith)
  // Sunset (0 questions left) goes down to -90 degrees (horizon)
  const angle = 90 - (1.0 - percentage) * 180; // 90 down to -90
  const angleRad = (angle * Math.PI) / 180;
  
  // Coordinates for the sun icon on a semi-circle path (radius 70)
  const cx = 100 + 70 * Math.cos(angleRad);
  const cy = 100 - 70 * Math.sin(angleRad);

  // Solstice stage texts and colors
  let stageTitle = "Solar Zenith";
  let stageDescription = "Warm golden light. Certainty is high.";
  let glowColor = "rgba(245, 158, 11, 0.6)"; // amber
  let gradientClass = "from-amber-500/20 to-orange-600/5";

  if (percentage <= 0) {
    stageTitle = "Longest Night";
    stageDescription = "The sun has set. Judgment is mandatory.";
    glowColor = "rgba(99, 102, 241, 0.6)"; // indigo
    gradientClass = "from-indigo-950/40 to-black/40";
  } else if (percentage <= 0.2) {
    stageTitle = "Twilight Solstice";
    stageDescription = "Shadows consume the archive. Time runs thin.";
    glowColor = "rgba(139, 92, 246, 0.6)"; // purple
    gradientClass = "from-purple-900/30 to-indigo-950/20";
  } else if (percentage <= 0.5) {
    stageTitle = "Declining Sun";
    stageDescription = "The light is folding. Shadows stretch out.";
    glowColor = "rgba(239, 68, 68, 0.6)"; // red
    gradientClass = "from-red-900/20 to-purple-950/10";
  } else if (percentage <= 0.8) {
    stageTitle = "Solstice Afternoon";
    stageDescription = "Golden hues deepening. Transition begins.";
    glowColor = "rgba(249, 115, 22, 0.6)"; // orange
    gradientClass = "from-orange-500/20 to-red-900/5";
  }

  return (
    <div className={`glass-panel rounded-2xl p-6 flex flex-col items-center justify-between h-full min-h-[300px] transition-all duration-1000 bg-gradient-to-b ${gradientClass}`}>
      <div className="text-center w-full">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">Deduction Clock</span>
        <h3 className="text-lg font-bold mt-1 text-zinc-100">{stageTitle}</h3>
        <p className="text-xs text-zinc-400 mt-1 min-h-[32px]">{stageDescription}</p>
      </div>

      {/* Astronomical Instrument Visualization */}
      <div className="relative w-48 h-48 flex items-center justify-center my-4">
        {/* Dial Ticks SVG */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Half arc track */}
          <path
            d="M 30,100 A 70,70 0 0,1 170,100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="3"
            strokeDasharray="4,4"
          />
          <path
            d="M 30,100 A 70,70 0 0,1 170,100"
            fill="none"
            stroke={percentage > 0.3 ? "rgba(245, 158, 11, 0.2)" : "rgba(99, 102, 241, 0.2)"}
            strokeWidth="2"
            strokeDasharray="1,6"
            strokeDashoffset="2"
          />
          
          {/* Hour markers */}
          {Array.from({ length: maxQuestions + 1 }).map((_, i) => {
            const tickAngle = 180 - (i * (180 / maxQuestions));
            const tickAngleRad = (tickAngle * Math.PI) / 180;
            const x1 = 100 + 66 * Math.cos(tickAngleRad);
            const y1 = 100 - 66 * Math.sin(tickAngleRad);
            const x2 = 100 + 74 * Math.cos(tickAngleRad);
            const y2 = 100 - 74 * Math.sin(tickAngleRad);
            
            const isCompleted = (maxQuestions - i) > questionsLeft;
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isCompleted ? "rgba(255, 255, 255, 0.1)" : (percentage > 0.4 ? "rgba(245, 158, 11, 0.4)" : "rgba(139, 92, 246, 0.4)")}
                strokeWidth={i % 5 === 0 ? "3" : "1.5"}
              />
            );
          })}
        </svg>

        {/* Rotating Sun/Moon Indicator */}
        <motion.div 
          className="absolute w-8 h-8 rounded-full flex items-center justify-center pointer-events-none"
          style={{ 
            left: `${cx - 16}px`, 
            top: `${cy - 16}px`,
            boxShadow: `0 0 15px ${glowColor}`,
            backgroundColor: percentage > 0.2 ? '#f59e0b' : '#6366f1'
          }}
          animate={{ x: 0, y: 0 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          {percentage > 0.2 ? (
            <Sun className="w-4 h-4 text-zinc-950" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-100" />
          )}
        </motion.div>

        {/* Dynamic Shadow Cast Line */}
        <div 
          className="absolute w-0.5 bg-gradient-to-t origin-bottom bottom-[50%] left-[50%] transition-all duration-1000"
          style={{
            height: `${50 + (1.0 - percentage) * 40}px`,
            backgroundColor: percentage > 0.4 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(99, 102, 241, 0.25)',
            transform: `rotate(${angle + 90}deg)`,
            boxShadow: percentage > 0.4 ? '0 0 8px rgba(245, 158, 11, 0.1)' : '0 0 8px rgba(99, 102, 241, 0.2)',
          }}
        />

        {/* Central Hub representing Alan Turing's original computer dials */}
        <div className="absolute w-14 h-14 rounded-full glass-panel flex flex-col items-center justify-center border border-zinc-700/60 shadow-inner">
          <span className="text-lg font-bold font-mono text-zinc-100">{questionsLeft}</span>
          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">turns</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-zinc-800/40 rounded-full h-1.5 border border-zinc-700/30 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-500"
          initial={{ width: "100%" }}
          animate={{ width: `${percentage * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};
