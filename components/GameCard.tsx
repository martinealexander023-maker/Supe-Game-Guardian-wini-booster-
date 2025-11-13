
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onSelect: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(game)}
      className="bg-gray-800/50 border border-green-500/20 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer
                 hover:bg-green-500/10 hover:border-green-400 transition-all duration-300 transform hover:scale-105 group"
    >
      <div className="text-green-400 group-hover:text-white transition-colors duration-300">
        {game.icon}
      </div>
      <h3 className="mt-4 font-semibold text-lg text-gray-300 group-hover:text-green-300 transition-colors duration-300">
        {game.name}
      </h3>
    </div>
  );
};

export default GameCard;
