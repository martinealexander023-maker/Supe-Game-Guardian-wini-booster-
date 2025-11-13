// FIX: Import React to provide the JSX namespace for using the JSX.Element type.
import React from 'react';

export interface Game {
  id: string;
  name: string;
  icon: JSX.Element;
  values: {
    id: string;
    name: string;
    icon: JSX.Element;
  }[];
}

export interface ValueEntry {
  address: string;
  value: number;
}
