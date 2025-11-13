
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Game } from '../types';
import ValueEditor from './ValueEditor';
import { CloseIcon, DraggableIcon } from '../assets/icons';

interface FloatingWindowProps {
  game: Game;
  onClose: () => void;
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({ game, onClose }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Center window on mount
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (windowRef.current) {
        const rect = windowRef.current.getBoundingClientRect();
        setPosition({
            x: (vw - rect.width) / 2,
            y: (vh - rect.height) / 2
        });
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.body.style.userSelect = 'none';
  }, [position]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.userSelect = '';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStartPos.current.x;
      const newY = e.clientY - dragStartPos.current.y;
      setPosition({ x: newX, y: newY });
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={windowRef}
      className="fixed top-0 left-0 w-full max-w-sm h-auto bg-gray-800 border-2 border-green-500/50 rounded-lg shadow-2xl shadow-green-500/10 z-50 flex flex-col"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <header
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between p-2 bg-black/80 cursor-grab active:cursor-grabbing rounded-t-md"
      >
        <div className="flex items-center gap-2">
            <DraggableIcon className="h-5 w-5 text-gray-500" />
            <span className="text-green-400 font-bold">{game.name} Editor</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-red-500/50 transition-colors"
          aria-label="Close"
        >
          <CloseIcon className="h-5 w-5 text-gray-300" />
        </button>
      </header>
      <div className="p-4 bg-gray-800/70 backdrop-blur-sm rounded-b-lg">
        <ValueEditor game={game} />
      </div>
    </div>
  );
};

export default FloatingWindow;