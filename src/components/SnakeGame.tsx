import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Point, Direction } from '../types';
import { GRID_SIZE, INITIAL_SNAKE_SPEED, MIN_SNAKE_SPEED, SPEED_INCREMENT } from '../constants';
import { Trophy, RefreshCw, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SNAKE_SPEED);

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check collisions
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE ||
        newHead.y < 0 || newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setSpeed(prev => Math.max(MIN_SNAKE_SPEED, prev - SPEED_INCREMENT));
        generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isPaused, isGameOver]);

  const generateFood = (currentSnake: Point[]) => {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  };

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setSpeed(INITIAL_SNAKE_SPEED);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case 'Enter': 
          if (isGameOver) restartGame();
          else setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isGameOver]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, speed]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const blockSize = canvas.width / GRID_SIZE;

    // Clear background - with scanlines effect in mind
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * blockSize, 0);
        ctx.lineTo(i * blockSize, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * blockSize);
        ctx.lineTo(canvas.width, i * blockSize);
        ctx.stroke();
    }

    // Draw food - flickering
    if (Math.random() > 0.1) {
      ctx.fillStyle = '#ff00ff'; 
      ctx.fillRect(food.x * blockSize + 2, food.y * blockSize + 2, blockSize - 4, blockSize - 4);
      // Glitch shadow for food
      if (Math.random() > 0.8) {
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(food.x * blockSize + 4, food.y * blockSize + 1, blockSize - 4, blockSize - 4);
      }
    }

    // Draw snake - pixelated and glitchy
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#00ffff' : '#00ffffcc';
      
      // Random "screen tearing" for snake body
      const offset = (Math.random() > 0.95) ? (Math.random() - 0.5) * 10 : 0;
      
      ctx.fillRect(segment.x * blockSize + 1 + offset, segment.y * blockSize + 1, blockSize - 2, blockSize - 2);
      
      if (index === 0 && Math.random() > 0.9) {
          ctx.strokeStyle = '#ff00ff';
          ctx.strokeRect(segment.x * blockSize - 2 + offset, segment.y * blockSize - 2, blockSize + 4, blockSize + 4);
      }
    });

  }, [snake, food]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex justify-between w-full px-2 font-pixel text-neon-cyan">
        <div className="flex flex-col">
          <span className="text-[10px] opacity-50">SCORE_DATA</span>
          <span className="text-xl leading-none">{score.toString().padStart(4, '0')}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] opacity-50">HIGH_SCRL</span>
          <span className="text-xl leading-none text-neon-magenta">{highScore.toString().padStart(4, '0')}</span>
        </div>
      </div>

      <div className="relative border-4 border-neon-cyan bg-glitch-bg p-1 shadow-[0_0_20px_#00ffff44]">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="block bg-black screen-tear"
        />

        <AnimatePresence>
          {(isGameOver || isPaused) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20"
            >
              {isGameOver ? (
                <>
                  <h2 className="text-4xl font-pixel text-neon-magenta mb-8 glitch-text" data-text="FATAL_ERROR">FATAL_ERROR</h2>
                  <button
                    onClick={restartGame}
                    className="group relative px-8 py-4 bg-neon-magenta text-black font-pixel text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <div className="absolute -inset-1 border border-neon-magenta group-hover:inset-0 transition-all"></div>
                    REBOOT_SYSTEM
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-4xl font-pixel text-neon-cyan mb-8 glitch-text" data-text="SYSTEM_HALT">SYSTEM_HALT</h2>
                  <button
                    onClick={() => setIsPaused(false)}
                    className="group relative px-8 py-4 bg-neon-cyan text-black font-pixel text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                  >
                    <div className="absolute -inset-1 border border-neon-cyan group-hover:inset-0 transition-all"></div>
                    RESUME_PROCESS
                  </button>
                  <p className="mt-8 text-neon-cyan text-[10px] font-pixel animate-pulse">PRESS ENTER TO EXECUTE</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="w-full flex justify-between font-pixel text-[8px] text-neon-cyan/40 px-2">
        <span>STRAT_X: 00FF</span>
        <span>MOD: GLITCH_CORE</span>
        <span>VER: 6.6.6</span>
      </div>
    </div>
  );
};

export default SnakeGame;
