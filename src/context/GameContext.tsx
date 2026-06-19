"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Character, CHARACTER_POOL, generateSimulatedResponse } from '../data/characters';
import confetti from 'canvas-confetti';

export type GameScreen = 'landing' | 'story' | 'lobby' | 'chat' | 'results';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface RoundCharacter {
  character: Character;
  assignedIdentity: 'human' | 'ai';
  userAccusation: 'human' | 'ai' | null;
  notes: string;
}

interface GameContextType {
  screen: GameScreen;
  round: number;
  score: number;
  streak: number;
  highScore: number;
  questionsLeft: number;
  maxQuestions: number;
  activeCharacterId: string | null;
  roundCharacters: RoundCharacter[];
  chatHistories: Record<string, ChatMessage[]>;
  isGeminiActive: boolean;
  isThinking: boolean;
  gameStartTime: number;
  setScreen: (screen: GameScreen) => void;
  startGame: () => void;
  startRound: () => void;
  selectCharacter: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  setUserAccusation: (characterId: string, status: 'human' | 'ai' | null) => void;
  updateNotes: (characterId: string, notes: string) => void;
  submitJudgement: () => void;
  nextRound: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<GameScreen>('landing');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [questionsLeft, setQuestionsLeft] = useState(10);
  const maxQuestions = 10;
  
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  const [roundCharacters, setRoundCharacters] = useState<RoundCharacter[]>([]);
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({});
  const [isGeminiActive, setIsGeminiActive] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [gameStartTime, setGameStartTime] = useState(0);

  // Load high score from local storage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('turing_high_score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
    
    // Check if Gemini API is available by calling a lightweight ping endpoint
    const checkGemini = async () => {
      try {
        const res = await fetch('/api/chat', { method: 'OPTIONS' });
        if (res.ok) {
          const data = await res.json();
          setIsGeminiActive(data.hasKey);
        }
      } catch (e) {
        setIsGeminiActive(false);
      }
    };
    checkGemini();
  }, []);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setRound(1);
    startRound();
    setScreen('story');
  };

  const startRound = () => {
    setQuestionsLeft(maxQuestions);
    setActiveCharacterId(null);
    setGameStartTime(Date.now());
    
    // Select 3 characters randomly from pool
    const shuffled = [...CHARACTER_POOL].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);
    
    // Assign human/ai randomly, ensuring at least one AI and at least one human
    let identities: ('human' | 'ai')[] = [];
    const aiCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 AIs
    for (let i = 0; i < selected.length; i++) {
      if (i < aiCount) {
        identities.push('ai');
      } else {
        identities.push('human');
      }
    }
    // Shuffle the identities
    identities.sort(() => 0.5 - Math.random());

    const activeRound: RoundCharacter[] = selected.map((char, index) => ({
      character: char,
      assignedIdentity: identities[index],
      userAccusation: null,
      notes: '',
    }));

    setRoundCharacters(activeRound);
    
    // Initialize chat histories with empty arrays
    const initialChats: Record<string, ChatMessage[]> = {};
    activeRound.forEach((rc) => {
      initialChats[rc.character.id] = [];
    });
    setChatHistories(initialChats);
  };

  const selectCharacter = (id: string) => {
    setActiveCharacterId(id);
    
    // Generate introduction if no chat history exists
    if (chatHistories[id]?.length === 0) {
      const rc = roundCharacters.find(c => c.character.id === id);
      if (rc) {
        setIsThinking(true);
        setTimeout(() => {
          const introMsg = generateSimulatedResponse(rc.character, rc.assignedIdentity, [], 'hello');
          setChatHistories(prev => ({
            ...prev,
            [id]: [{ role: 'assistant', content: introMsg, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
          }));
          setIsThinking(false);
        }, 800);
      }
    }
  };

  const sendMessage = async (content: string) => {
    if (!activeCharacterId || questionsLeft <= 0 || isThinking) return;

    const currentHistory = chatHistories[activeCharacterId] || [];
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = { role: 'user', content, timestamp };
    
    // Update local chat history immediately
    const updatedHistory = [...currentHistory, userMsg];
    setChatHistories(prev => ({
      ...prev,
      [activeCharacterId]: updatedHistory
    }));
    setQuestionsLeft(prev => prev - 1);
    setIsThinking(true);

    const rc = roundCharacters.find(c => c.character.id === activeCharacterId);
    if (!rc) return;

    let reply = '';
    
    // Attempt Live API route first, fallback to Local Simulator on error
    if (isGeminiActive) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            character: rc.character,
            assignedIdentity: rc.assignedIdentity,
            history: updatedHistory.map(m => ({ role: m.role, content: m.content })),
            newMessage: content
          })
        });

        if (response.ok) {
          const data = await response.json();
          reply = data.reply;
        } else {
          // API failed, fallback
          reply = generateSimulatedResponse(rc.character, rc.assignedIdentity, updatedHistory, content);
        }
      } catch (err) {
        reply = generateSimulatedResponse(rc.character, rc.assignedIdentity, updatedHistory, content);
      }
    } else {
      // Simulate typical network latency for a highly realistic feel
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 800));
      reply = generateSimulatedResponse(rc.character, rc.assignedIdentity, updatedHistory, content);
    }

    setChatHistories(prev => ({
      ...prev,
      [activeCharacterId]: [...updatedHistory, { role: 'assistant', content: reply, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]
    }));
    setIsThinking(false);
  };

  const setUserAccusation = (characterId: string, status: 'human' | 'ai' | null) => {
    setRoundCharacters(prev =>
      prev.map(rc => rc.character.id === characterId ? { ...rc, userAccusation: status } : rc)
    );
  };

  const updateNotes = (characterId: string, notes: string) => {
    setRoundCharacters(prev =>
      prev.map(rc => rc.character.id === characterId ? { ...rc, notes } : rc)
    );
  };

  const submitJudgement = () => {
    // Scoring logic
    let correctCount = 0;
    roundCharacters.forEach(rc => {
      if (rc.userAccusation === rc.assignedIdentity) {
        correctCount++;
      }
    });

    const isAllCorrect = correctCount === roundCharacters.length;
    
    // Core points
    let pointsGained = correctCount * 1000;
    
    // Question savings bonus (+150 per question left)
    const questionsBonus = questionsLeft * 150;
    pointsGained += questionsBonus;
    
    // Perfect round bonus (+1000)
    if (isAllCorrect) {
      pointsGained += 1000;
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    // Streak multiplier
    if (streak > 0 && isAllCorrect) {
      pointsGained += streak * 500;
    }

    const newScore = score + pointsGained;
    setScore(newScore);

    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('turing_high_score', newScore.toString());
    }

    // Throw confetti on perfect score
    if (isAllCorrect) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }

    setScreen('results');
  };

  const nextRound = () => {
    setRound(prev => prev + 1);
    startRound();
    setScreen('lobby');
  };

  const resetGame = () => {
    setScreen('landing');
    setScore(0);
    setStreak(0);
    setRound(1);
  };

  return (
    <GameContext.Provider value={{
      screen,
      round,
      score,
      streak,
      highScore,
      questionsLeft,
      maxQuestions,
      activeCharacterId,
      roundCharacters,
      chatHistories,
      isGeminiActive,
      isThinking,
      gameStartTime,
      setScreen,
      startGame,
      startRound,
      selectCharacter,
      sendMessage,
      setUserAccusation,
      updateNotes,
      submitJudgement,
      nextRound,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
