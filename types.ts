import React from 'react';

export interface Game {
  id: string;
  name: string;
  // FIX: Added React import to provide JSX.Element type
  icon: JSX.Element;
  values: {
    id: string;
    name: string;
    // FIX: Added React import to provide JSX.Element type
    icon: JSX.Element;
  }[];
}

export interface ValueEntry {
  address: string;
  value: number;
}
