import React from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';
import { Music, Gamepad2, Radio } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-glitch-bg selection:bg-neon-magenta selection:text-black">
      <div className="noise-overlay"></div>
      
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Sidebar - Player Info */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden lg:flex lg:col-span-3 flex-col space-y-4"
        >
          <div className="border-2 border-neon-cyan p-4 bg-black">
            <div className="flex items-center space-x-2 text-neon-cyan mb-4 border-b border-neon-cyan pb-2">
              <Gamepad2 size={16} />
              <h2 className="font-pixel text-[10px] tracking-widest uppercase">NODE_STATUS</h2>
            </div>
            <div className="space-y-2 font-pixel text-xs uppercase">
              <div className="flex justify-between">
                <span className="text-neon-cyan/40">USER_ID</span>
                <span className="text-neon-cyan">X_SUBJECT_07</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-cyan/40">CORE_VER</span>
                <span className="text-neon-cyan">6.6.6_STABLE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neon-cyan/40">SYNC_LVL</span>
                <span className="text-neon-magenta">CRITICAL</span>
              </div>
            </div>
          </div>

          <div className="border border-neon-magenta/40 p-4 bg-black/80">
            <div className="flex items-center space-x-2 text-neon-magenta mb-2">
              <Radio size={16} />
              <h2 className="font-pixel text-[10px] tracking-widest uppercase">WAVE_EXTRACT</h2>
            </div>
            <p className="text-neon-magenta/60 text-[8px] leading-tight font-pixel uppercase tracking-tighter">
              BROADCASTING_ENCRYPTED_SIGNALS. NEURAL_INTERFACE_READY. DO_NOT_DISCONNECT.
            </p>
          </div>
        </motion.div>

        {/* Center - Game Window */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-6 flex flex-col items-center"
        >
          <div className="mb-6 text-center">
            <h1 className="text-6xl font-pixel text-neon-cyan uppercase glitch-text leading-tight" data-text="TERMINAL_SNAKE">
              TERMINAL_SNAKE
            </h1>
            <div className="text-[10px] font-pixel text-neon-magenta tracking-[0.5em] mt-2 animate-pulse">
              [ SECRE_DATA_COLLECTION_PROTOCOL ]
            </div>
          </div>
          <SnakeGame />
        </motion.div>

        {/* Right - Music Player */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 flex flex-col space-y-4"
        >
          <div className="flex items-center space-x-2 text-neon-cyan px-2 border-l-4 border-neon-cyan h-4">
            <Music size={16} />
            <h2 className="font-pixel text-[10px] tracking-widest uppercase">AUDIO_BUFFER</h2>
          </div>
          <MusicPlayer />
          
          <div className="border-t-2 border-neon-cyan/20 pt-4 px-2">
            <h4 className="text-neon-cyan font-pixel text-[8px] uppercase mb-4 tracking-widest">_LOG_ENTRIES:</h4>
            <div className="space-y-1 font-pixel text-[8px] text-neon-cyan/40 uppercase">
              <p className="hover:text-neon-cyan transition-colors cursor-default">{`[${new Date().toISOString()}] INITIALIZING_CORE`}</p>
              <p className="hover:text-neon-cyan transition-colors cursor-default">{`[${new Date().toISOString()}] SYNCING_NEURAL_RECEPTORS`}</p>
              <p className="hover:text-neon-cyan transition-colors cursor-default text-neon-magenta animate-pulse">{`[${new Date().toISOString()}] ERROR: INJECTION_STALLED`}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Retro bottom bar */}
      <footer className="fixed bottom-0 left-0 w-full p-2 border-t border-neon-cyan/20 bg-glitch-bg/90 backdrop-blur-sm hidden md:flex justify-between items-center z-50">
        <div className="flex items-center space-x-4">
          <div className="w-1.5 h-1.5 bg-neon-cyan animate-ping"></div>
          <span className="font-pixel text-[8px] text-neon-cyan uppercase">SYS_STABLE // SECTOR_7_ON_GRID</span>
        </div>
        <div className="flex items-center space-x-8 font-pixel text-[8px] text-neon-cyan opacity-40">
          <span>MEM: 640K_REQ</span>
          <span>CYC_WAIT: 0.003ms</span>
          <span className="text-neon-magenta opacity-100">ERR_COUNT: 0</span>
        </div>
      </footer>
    </div>
  );
}
