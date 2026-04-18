import React, { useState, useRef, useEffect } from 'react';
import { TRACKS } from '../constants';
import { Play, Pause, SkipForward, SkipBack, Volume2, Disc } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(p || 0);
    }
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
  }, [currentTrackIndex]);

  return (
    <div className="w-full bg-black border-2 border-neon-cyan p-4 relative overflow-hidden screen-tear shadow-[0_0_15px_#00ffff33]">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={handleNext}
      />
      
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
           <div className="bg-neon-cyan text-black px-2 py-1 font-pixel text-[10px] uppercase">
             SIGNAL_EXTRACT
           </div>
           <div className="text-neon-cyan font-pixel text-[10px] animate-pulse">
             {isPlaying ? 'ACTIVE' : 'IDLE'}
           </div>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-neon-magenta font-pixel text-lg glitch-text h-8 leading-tight overflow-hidden" data-text={currentTrack.title}>
            {currentTrack.title}
          </h3>
          <p className="text-neon-cyan/60 font-pixel text-[10px] uppercase tracking-widest truncate">
            ENCODED_BY: {currentTrack.artist}
          </p>
        </div>

        {/* Binary/Digital progress */}
        <div className="flex flex-col space-y-1">
          <div className="flex justify-between font-pixel text-[8px] text-neon-cyan/40">
            <span>OFF_SET: {audioRef.current?.currentTime.toFixed(2) || '0.00'}</span>
            <span>DATA_LEN: {audioRef.current?.duration.toFixed(2) || '0.00'}</span>
          </div>
          <div className="relative h-4 w-full bg-neon-cyan/10 border border-neon-cyan/20">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-neon-cyan"
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
            />
            {/* Scrubber dots */}
            <div className="absolute inset-0 flex justify-between pointer-events-none opacity-50">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="w-px h-full bg-black"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls - Jarring buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={handlePrev}
            className="border border-neon-cyan text-neon-cyan font-pixel text-[8px] py-3 hover:bg-neon-cyan hover:text-black transition-colors uppercase active:translate-y-px"
          >
            SEQ_BACK
          </button>
          
          <button 
            onClick={togglePlay}
            className="border-2 border-neon-magenta text-neon-magenta font-pixel text-[8px] py-3 hover:bg-neon-magenta hover:text-black transition-colors uppercase active:translate-y-px"
          >
            {isPlaying ? 'TERM_EXE' : 'INIT_EXE'}
          </button>

          <button 
            onClick={handleNext}
            className="border border-neon-cyan text-neon-cyan font-pixel text-[8px] py-3 hover:bg-neon-cyan hover:text-black transition-colors uppercase active:translate-y-px"
          >
            SEQ_FWD
          </button>
        </div>
      </div>

      {/* Decorative glitch bars */}
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-neon-magenta to-transparent opacity-30"></div>
    </div>
  );
};

export default MusicPlayer;
