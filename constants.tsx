
import React from 'react';
import { Game } from './types';
import { RobloxIcon, FreeFireIcon, DiamondIcon, RobuxIcon } from './assets/icons';

export const GAMES: Game[] = [
  {
    id: 'roblox',
    name: 'Roblox',
    icon: <RobloxIcon className="h-16 w-16" />,
    values: [
      { id: 'robux', name: 'Robux', icon: <RobuxIcon className="h-6 w-6 text-green-400" /> },
    ],
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    icon: <FreeFireIcon className="h-16 w-16" />,
    values: [
      { id: 'diamonds', name: 'Diamonds', icon: <DiamondIcon className="h-6 w-6 text-blue-400" /> },
    ],
  },
];
