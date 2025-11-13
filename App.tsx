
import React, { useState, useCallback } from 'react';
import { Game } from './types';
import { GAMES } from './constants';
import GameCard from './components/GameCard';
import FloatingWindow from './components/FloatingWindow';
import DisclaimerModal from './components/DisclaimerModal';

const App: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState<boolean>(true);

  const handleSelectGame = useCallback((game: Game) => {
    setSelectedGame(game);
  }, []);

  const handleCloseWindow = useCallback(() => {
    setSelectedGame(null);
  }, []);

  const handleAcceptDisclaimer = useCallback(() => {
    setShowDisclaimer(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-mono overflow-hidden">
      {showDisclaimer && <DisclaimerModal onAccept={handleAcceptDisclaimer} />}
      
      <div className={`filter ${showDisclaimer ? 'blur-sm' : ''} transition-filter duration-300`}>
        <header className="p-4 bg-gray-900/50 backdrop-blur-sm border-b border-green-500/20 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-green-400 tracking-wider">
            Game Value Editor <span className="text-gray-400">[Simulator]</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Select a game to begin simulation</p>
        </header>

        <main className="p-4 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {GAMES.map((game) => (
              <GameCard key={game.id} game={game} onSelect={handleSelectGame} />
            ))}
          </div>
        </main>

        {selectedGame && (
          <FloatingWindow game={selectedGame} onClose={handleCloseWindow} />
        )}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 p-2 text-center text-xs text-gray-600 bg-gray-900/50">
        <p>This is a simulation for entertainment purposes only. No real game data is accessed or modified.</p>
      </footer>
    </div>
  );
};

export default App;
