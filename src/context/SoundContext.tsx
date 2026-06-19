"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playKeyClick: () => void;
  playTerminalStart: () => void;
  playError: () => void;
  setDroneIntensity: (intensity: number) => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true); // Default to muted for auto-play policy
  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscillatorRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);

  // Initialize Audio Context on first un-mute
  useEffect(() => {
    if (!isMuted && !audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Setup Ambient Drone
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, audioCtxRef.current.currentTime); // Low A1
      
      gain.gain.setValueAtTime(0.02, audioCtxRef.current.currentTime); // Very quiet
      
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      
      osc.start();
      
      droneOscillatorRef.current = osc;
      droneGainRef.current = gain;
    } else if (isMuted && audioCtxRef.current) {
      audioCtxRef.current.suspend();
    } else if (!isMuted && audioCtxRef.current) {
      audioCtxRef.current.resume();
    }
  }, [isMuted]);

  const playKeyClick = () => {
    if (isMuted || !audioCtxRef.current) return;
    
    // Create a very short, high-frequency noise burst for a mechanical click
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(800 + Math.random() * 200, audioCtxRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtxRef.current.currentTime + 0.02);
    
    gain.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.02);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.02);
  };

  const playTerminalStart = () => {
    if (isMuted || !audioCtxRef.current) return;
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, audioCtxRef.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, audioCtxRef.current.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, audioCtxRef.current.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.5);
  };

  const playError = () => {
    if (isMuted || !audioCtxRef.current) return;
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, audioCtxRef.current.currentTime);
    osc.frequency.linearRampToValueAtTime(100, audioCtxRef.current.currentTime + 0.2);
    
    gain.gain.setValueAtTime(0.1, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + 0.2);
  };

  const setDroneIntensity = (intensity: number) => {
    // Intensity goes from 0 (zenith, normal) to 1 (sunset, intense)
    if (!droneOscillatorRef.current || !droneGainRef.current || !audioCtxRef.current) return;
    
    const baseFreq = 55;
    const targetFreq = baseFreq - (intensity * 15); // Drone gets lower and more ominous
    const targetGain = 0.02 + (intensity * 0.03); // Slightly louder
    
    droneOscillatorRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 1);
    droneGainRef.current.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 1);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <SoundContext.Provider value={{ isMuted, toggleMute, playKeyClick, playTerminalStart, playError, setDroneIntensity }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
