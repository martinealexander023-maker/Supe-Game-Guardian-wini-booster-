
import React from 'react';
import { WarningIcon } from '../assets/icons';

interface DisclaimerModalProps {
  onAccept: () => void;
}

const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ onAccept }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-yellow-500/50 rounded-lg max-w-lg w-full p-6 text-center shadow-lg shadow-yellow-500/10">
        <div className="flex justify-center mb-4">
          <WarningIcon className="h-12 w-12 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold text-yellow-300 mb-2">Disclaimer</h2>
        <p className="text-gray-300 mb-6">
          This application is a <strong className="font-bold text-white">SIMULATOR</strong> and is for entertainment and educational purposes only. It does <strong className="font-bold text-white">NOT</strong> actually hack, modify, or interact with any real game files or data. All features are simulated.
        </p>
        <button
          onClick={onAccept}
          className="bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-md hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          I Understand & Agree
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;
