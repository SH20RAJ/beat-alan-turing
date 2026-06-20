"use client";

import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { SolsticeDial } from '../components/SolsticeDial';
import { CharacterCard } from '../components/CharacterCard';
import { ChatTerminal } from '../components/ChatTerminal';
import { 
  Sun, 
  HelpCircle, 
  Play, 
  ArrowRight, 
  ArrowLeft, 
  CheckSquare, 
  RotateCcw, 
  Trophy, 
  Flame, 
  Volume2,
  VolumeX,
  ShieldAlert, 
  Network,
  Cpu,
  User,
  Heart,
  Brain,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '../context/SoundContext';

export default function Home() {
  const {
    screen,
    round,
    score,
    streak,
    highScore,
    questionsLeft,
    activeCharacterId,
    roundCharacters,
    chatHistories,
    evaluationText,
    startGame,
    submitJudgement,
    nextRound,
    resetGame,
    selectCharacter,
    setScreen,
  } = useGame();

  const { isMuted, toggleMute, playKeyClick, setDroneIntensity } = useSound();

  // Story Screen local typewriter effect
  const storyText = `ON THIS, THE JUNE SOLSTICE, THE SUN REACHES ITS HIGHEST ZENITH, YET ITS LIGHT CASTS THE LONGEST SHADOWS.

IN 1950, ALAN TURING PROPOSED A TEST: CAN A MACHINE IMITATE A HUMAN CONSCIOUSNESS WELL ENOUGH TO BLEND INTO SEAMLESS CONVERSATION?

YOU HAVE ENTERED THE SOLSTICE ARCHIVE VERIFICATION CHAMBER. THREE MIND NODES ARE CONNECTED. SOME ARE HUMANS, OTHERS ARE AI MINDS MASQUERADING AS HUMANS.

YOU HAVE EXACTLY 10 TRANSMISSIONS. INTERROGATE THE NODES, LOG YOUR OBSERVATIONS, AND MARK EACH MIND AS EITHER HUMAN OR AI. 

AS THE TRANSMISSIONS DECREASE, THE SUN WILL SET, AND SHADOWS WILL STRETCH. TRUST NOTHING BUT THE SHADOW OF THEIR WORDS.`;

  const [storyTyped, setStoryTyped] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    if (screen === 'story') {
      setStoryTyped('');
      setTypingIndex(0);
    }
  }, [screen]);

  useEffect(() => {
    if (screen === 'story' && typingIndex < storyText.length) {
      const timeout = setTimeout(() => {
        setStoryTyped(prev => prev + storyText[typingIndex]);
        setTypingIndex(prev => prev + 1);
        // Play keyboard click sound occasionally for the story text
        if (typingIndex % 3 === 0) playKeyClick();
      }, 20 + Math.random() * 30);
      return () => clearTimeout(timeout);
    }
  }, [screen, typingIndex, storyText]);

  // Adjust drone intensity based on questions left
  useEffect(() => {
    if (screen === 'chat') {
      const intensity = 1 - (questionsLeft / 10);
      setDroneIntensity(intensity);
    } else {
      setDroneIntensity(0);
    }
  }, [questionsLeft, screen, setDroneIntensity]);

  // Check if player has made an accusation for all 3 characters
  const isJudgementReady = roundCharacters.every(rc => rc.userAccusation !== null);

  // Background styling mapping based on questions left
  const getSolsticeThemeClass = () => {
    if (screen === 'landing') return 'from-zinc-950 via-zinc-900 to-black';
    if (screen === 'story') return 'from-zinc-950 via-zinc-950 to-zinc-900';
    
    // During game, shift background lighting as daylight fades
    if (questionsLeft >= 8) return 'from-amber-950/20 via-zinc-950 to-zinc-950';
    if (questionsLeft >= 5) return 'from-orange-950/20 via-zinc-950 to-zinc-950';
    if (questionsLeft >= 2) return 'from-purple-950/20 via-zinc-950 to-zinc-950';
    return 'from-indigo-950/30 via-zinc-950 to-zinc-950';
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-1000 bg-gradient-to-tr ${getSolsticeThemeClass()} py-6 px-4 md:px-8 w-full`}>
      
      {/* 1. HEADER (Renders on game screens) */}
      {screen !== 'landing' && screen !== 'story' && (
        <header className="flex flex-col sm:flex-row justify-between items-center border-b border-zinc-800/80 pb-4 mb-6 gap-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/10">
              <Sun className="w-5 h-5 text-zinc-950" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-wider font-mono text-zinc-100">SOLSTICE VERIFICATION</h1>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">June Solstice Game Jam Submission</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 font-mono">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] text-zinc-500 uppercase">Score:</span>
              <span className="text-sm font-bold text-zinc-100 glow-text-warm">{score}</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-[10px] text-zinc-500 uppercase">Streak:</span>
              <span className="text-sm font-bold text-zinc-100">{streak}</span>
            </div>
            <button 
              onClick={toggleMute}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <div className="bg-zinc-900 border border-zinc-800/80 px-3 py-1.5 rounded-lg font-mono text-xs text-zinc-400 hidden sm:block">
              Cycle <span className="text-zinc-100 font-bold">#{round}</span>
            </div>
          </div>
        </header>
      )}

      {/* 2. MAIN SCREENS CONTENT */}
      <main className="flex-1 flex flex-col justify-center my-4 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* LANDING SCREEN */}
          {screen === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto py-12"
            >
              <div className="relative w-36 h-36 flex items-center justify-center mb-8">
                <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl animate-pulse" />
                <div className="w-24 h-24 rounded-full border border-amber-500/30 flex items-center justify-center relative glow-border-warm">
                  <Sun className="w-10 h-10 text-amber-500 animate-spin" style={{ animationDuration: '30s' }} />
                  <div className="absolute w-32 h-32 border border-dashed border-zinc-800 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
                </div>
              </div>

              <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-amber-500 mb-2 block font-semibold">
                JUNE SOLSTICE GAME JAM 2026
              </span>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 text-zinc-100">
                CAN YOU BEAT <br className="hidden sm:inline" />
                <span className="sunset-text font-mono tracking-wide">ALAN TURING?</span>
              </h1>
              <p className="text-zinc-400 text-sm md:text-base max-w-lg mb-8 leading-relaxed">
                Enter the Solstice Archive verification chamber. Engage with three connected mind nodes, observe their dialogue tells under the setting solstice sun, and separate humanity from machine intelligence.
              </p>

              <button
                onClick={startGame}
                className="group bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-zinc-950 font-bold px-8 py-4 rounded-xl shadow-xl shadow-orange-500/15 hover:shadow-orange-500/25 transition-all duration-300 font-mono text-sm tracking-wider uppercase flex items-center gap-2 cursor-pointer border border-amber-400/20"
              >
                Initiate Handshake
                <Play className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="mt-12 flex justify-center gap-8 border-t border-zinc-900 pt-8 w-full">
                <div className="text-center font-mono">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Category 01</span>
                  <span className="text-xs text-zinc-300 mt-1 block">Best Google AI Usage</span>
                </div>
                <div className="text-center font-mono">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Category 02</span>
                  <span className="text-xs text-zinc-300 mt-1 block">Ode to Alan Turing</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STORY SCREEN */}
          {screen === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto glass-panel p-8 md:p-10 rounded-3xl border-zinc-800"
            >
              <div className="flex items-center gap-2 font-mono text-zinc-500 text-xs mb-6 border-b border-zinc-900 pb-3">
                <Network className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>ESTABLISHING DECRYPTED TRANS-LINK... SUCCESS</span>
              </div>

              <div className="font-mono text-xs md:text-sm text-zinc-300 leading-relaxed min-h-[220px] whitespace-pre-wrap">
                {storyTyped}
                <span className="inline-block w-1.5 h-4 bg-amber-500 animate-pulse ml-0.5" />
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-end">
                {typingIndex >= storyText.length ? (
                  <button
                    onClick={() => setScreen('lobby')}
                    className="bg-amber-500 text-zinc-950 font-bold px-6 py-3 rounded-xl font-mono text-xs uppercase flex items-center gap-1.5 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
                  >
                    Enter Archive Room
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setTypingIndex(storyText.length)}
                    className="text-zinc-500 hover:text-zinc-300 text-xs font-mono py-2"
                  >
                    [Skip Transmission]
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* GAME LOBBY / CHARACTER SELECTION */}
          {screen === 'lobby' && (
            <motion.div
              key="lobby"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left 9 columns: Characters grid */}
              <div className="lg:col-span-9 flex flex-col justify-between space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-zinc-100 font-mono tracking-tight uppercase">Dossier Selection</h2>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                    Select a connected node profile below to open communication. Analyze their expressions and search for tells. Classify every profile as Human or AI before submitting.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {roundCharacters.map((rc) => (
                    <CharacterCard
                      key={rc.character.id}
                      charId={rc.character.id}
                      isSelectable={true}
                      isActive={rc.character.id === activeCharacterId}
                    />
                  ))}
                </div>

                {/* Submit Judgement Section */}
                <div className="bg-zinc-950/40 p-5 rounded-2xl border border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <CheckSquare className="w-5 h-5 text-amber-500" />
                    <div>
                      <h4 className="text-xs font-bold text-zinc-200 uppercase font-mono">Deduction Protocol</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">
                        {isJudgementReady 
                          ? "All nodes classified. Ready to submit verdict." 
                          : "Classify all nodes as Human or AI to complete the protocol."}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={submitJudgement}
                    disabled={!isJudgementReady}
                    className={`px-6 py-3 rounded-xl font-mono text-xs uppercase font-bold transition-all duration-300 cursor-pointer ${
                      isJudgementReady 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 hover:shadow-lg hover:shadow-orange-500/10' 
                        : 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'
                    }`}
                  >
                    Submit Judgement
                  </button>
                </div>
              </div>

              {/* Right 3 columns: Solstice Dial */}
              <div className="lg:col-span-3">
                <SolsticeDial />
              </div>
            </motion.div>
          )}

          {/* CHAT SCREEN */}
          {screen === 'chat' && (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col space-y-4"
            >
              {/* Top Bar: Navigation + Character Switcher + Turns */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setScreen('lobby')}
                    className="text-xs font-mono text-zinc-400 hover:text-zinc-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    [Return to Dossier Grid]
                  </button>
                  <div className="font-mono text-xs text-zinc-400">
                    Transmissions remaining: <span className="font-bold text-amber-400">{questionsLeft}</span>
                  </div>
                </div>

                {/* Character Quick-Switch Tabs */}
                <div className="flex gap-2">
                  {roundCharacters.map((rc) => {
                    const isCurrentlyActive = rc.character.id === activeCharacterId;
                    const hasMessages = (chatHistories[rc.character.id] || []).length > 0;
                    return (
                      <button
                        key={rc.character.id}
                        onClick={() => selectCharacter(rc.character.id)}
                        className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-mono transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                          isCurrentlyActive
                            ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 font-bold'
                            : 'bg-zinc-900/60 border-zinc-800/60 text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                        }`}
                      >
                        {hasMessages && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />}
                        <span className="truncate">{rc.character.name.split(' ')[0]}</span>
                        {rc.userAccusation && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                            rc.userAccusation === 'ai' ? 'bg-indigo-950 text-indigo-400' : 'bg-amber-950 text-amber-400'
                          }`}>
                            {rc.userAccusation.toUpperCase()}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <ChatTerminal />
            </motion.div>
          )}

          {/* RESULTS SCREEN */}
          {screen === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              {/* Result Header Card */}
              {(() => {
                const correctCount = roundCharacters.filter(rc => rc.userAccusation === rc.assignedIdentity).length;
                const isAllCorrect = correctCount === roundCharacters.length;

                return (
                  <div className={`glass-panel p-8 rounded-3xl text-center relative overflow-hidden border ${
                    isAllCorrect ? 'border-emerald-500/30 bg-emerald-950/5' : 'border-rose-500/30 bg-rose-950/5'
                  }`}>
                    {/* Glowing circular background light */}
                    <div className={`absolute w-48 h-48 rounded-full blur-3xl -top-24 left-[50%] -translate-x-[50%] opacity-20 pointer-events-none ${
                      isAllCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                    }`} />

                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-zinc-400">
                      Archive verdict analysis
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black mt-2 tracking-tight uppercase leading-none font-mono">
                      {isAllCorrect ? (
                        <span className="text-emerald-400 glow-text-cool">Perfect Alignment</span>
                      ) : (
                        <span className="text-rose-400">Cognitive Discrepancy</span>
                      )}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                      You identified {correctCount} of {roundCharacters.length} minds accurately. The solar cycles shift forward.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
                      <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-900 font-mono text-center">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Total Score</span>
                        <span className="text-xl font-black text-zinc-100 block mt-1">{score}</span>
                      </div>
                      <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-900 font-mono text-center">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Accuracy</span>
                        <span className="text-xl font-black text-zinc-100 block mt-1">
                          {Math.round((correctCount / roundCharacters.length) * 100)}%
                        </span>
                      </div>
                      <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-900 font-mono text-center">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Active Streak</span>
                        <span className="text-xl font-black text-zinc-100 block mt-1">{streak} cycles</span>
                      </div>
                      <div className="bg-zinc-950/50 p-4 rounded-xl border border-zinc-900 font-mono text-center">
                        <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">High Score</span>
                        <span className="text-xl font-black text-amber-500 block mt-1">{highScore}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Psychological Evaluation (Gemini) */}
              <div className="glass-panel p-6 rounded-2xl border-zinc-800 bg-zinc-950/80">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-zinc-300 font-mono tracking-widest uppercase flex items-center gap-2">
                    <Brain className="w-4 h-4 text-indigo-400" />
                    Psychological Profiling
                  </h3>
                  <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-400 border border-indigo-500/20">
                    Gemini API Analysis
                  </span>
                </div>
                {evaluationText ? (
                  <p className="text-sm text-zinc-300 leading-relaxed italic border-l-2 border-indigo-500/40 pl-4 py-1">
                    "{evaluationText}"
                  </p>
                ) : (
                  <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Generating cognitive evaluation...
                  </div>
                )}
              </div>

              {/* Reveal Grid */}
              <div>
                <h3 className="text-base font-bold text-zinc-400 font-mono tracking-widest uppercase mb-4 text-center">
                  Cognitive Node Reveal
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {roundCharacters.map((rc) => (
                    <CharacterCard
                      key={rc.character.id}
                      charId={rc.character.id}
                      showResult={true}
                    />
                  ))}
                </div>
              </div>

              {/* Tribute to Alan Turing & Solstice Reflection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border-zinc-800">
                  <div className="font-mono">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 block mb-2">Turing's Reflection</span>
                    <blockquote className="text-sm text-zinc-300 italic leading-relaxed border-l-2 border-amber-500/40 pl-3">
                      &ldquo;We can only see a short distance ahead, but we can see plenty there that needs to be done.&rdquo;
                    </blockquote>
                  </div>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-4">
                    In his 1950 seminal work, *Computing Machinery and Intelligence*, Turing bypassed the unsolvable question of whether machines can &ldquo;think&rdquo; by setting up the Imitation Game. You have played that same game today.
                  </p>
                </div>

                <div className="glass-panel p-6 rounded-2xl flex flex-col justify-between border-zinc-800">
                  <div className="font-mono">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-500 block mb-2">Solstice Analogy</span>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      On the June Solstice, light reaches its absolute peak. In full light, shapes are clear—yet behind every object lies a deep shadow. Logic is the light; tells are the shadow. To beat Turing is to master both.
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => window.print()}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-indigo-400 font-bold p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                      title="Print Verification Certificate"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextRound}
                      className="flex-1 bg-amber-500 text-zinc-950 font-bold py-3 px-4 rounded-xl font-mono text-xs uppercase flex items-center justify-center gap-1.5 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 cursor-pointer"
                    >
                      Next Solar Cycle
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={resetGame}
                      className="bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 font-bold p-3 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                      title="Reset Terminal"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 3. FOOTER */}
      <footer className="mt-8 border-t border-zinc-900/60 pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-zinc-600 font-mono gap-2 max-w-7xl mx-auto w-full">
        <div>
          &copy; 2026 June Solstice Game Jam.
        </div>
        <div className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> as an Ode to Alan Turing.
        </div>
      </footer>

    </div>
  );
}
