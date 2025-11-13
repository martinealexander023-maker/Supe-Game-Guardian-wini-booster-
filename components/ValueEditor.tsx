
import React, { useState, useCallback } from 'react';
import { Game, ValueEntry } from '../types';
import { SearchIcon, SaveIcon, EditIcon, CheckIcon, LoadingIcon } from '../assets/icons';

interface ValueEditorProps {
  game: Game;
}

type EditorState = 'idle' | 'searching' | 'found' | 'editing' | 'saving' | 'saved';

const ValueEditor: React.FC<ValueEditorProps> = ({ game }) => {
  const [state, setState] = useState<EditorState>('idle');
  const [searchValue, setSearchValue] = useState<string>('');
  const [foundValues, setFoundValues] = useState<ValueEntry[]>([]);
  const [selectedValue, setSelectedValue] = useState<ValueEntry | null>(null);
  const [newValue, setNewValue] = useState<string>('');

  const handleSearch = useCallback(() => {
    if (!searchValue || isNaN(Number(searchValue))) return;
    setState('searching');
    setFoundValues([]);
    setSelectedValue(null);

    setTimeout(() => {
      const numFound = Math.floor(Math.random() * 4) + 1;
      const newFoundValues: ValueEntry[] = [];
      for (let i = 0; i < numFound; i++) {
        newFoundValues.push({
          address: `0x${(Math.random() * 0xFFFFFFF).toString(16).toUpperCase().padStart(8, '0')}`,
          value: Number(searchValue),
        });
      }
      setFoundValues(newFoundValues);
      setState('found');
    }, 1500 + Math.random() * 1000);
  }, [searchValue]);

  const handleSelectValue = useCallback((value: ValueEntry) => {
    setSelectedValue(value);
    setNewValue(value.value.toString());
    setState('editing');
  }, []);
  
  const handleSave = useCallback(() => {
    if (!selectedValue || !newValue || isNaN(Number(newValue))) return;
    setState('saving');
    setTimeout(() => {
        const updatedValues = foundValues.map(v => 
            v.address === selectedValue.address ? { ...v, value: Number(newValue) } : v
        );
        setFoundValues(updatedValues);
        setSelectedValue({...selectedValue, value: Number(newValue)});
        setState('saved');

        setTimeout(() => {
            setState('editing');
        }, 2000);

    }, 1500);

  }, [selectedValue, newValue, foundValues]);

  const selectedGameValue = game.values[0];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="search" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1">
          {selectedGameValue.icon}
          <span>Search for {selectedGameValue.name} Value</span>
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="e.g., 100"
            disabled={state === 'searching'}
            className="w-full bg-black/50 border border-gray-600 text-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
          />
          <button
            onClick={handleSearch}
            disabled={state === 'searching'}
            className="flex items-center justify-center p-2 bg-green-600 text-white rounded-md hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {state === 'searching' ? <LoadingIcon className="h-5 w-5" /> : <SearchIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {state === 'searching' && (
        <div className="text-center text-gray-400">
            <p>Scanning memory...</p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                <div className="bg-green-500 h-2.5 rounded-full animate-pulse"></div>
            </div>
        </div>
      )}

      {foundValues.length > 0 && ['found', 'editing', 'saving', 'saved'].includes(state) && (
        <div>
          <h4 className="text-sm font-bold text-gray-400 border-b border-gray-600 pb-1 mb-2">Results Found: {foundValues.length}</h4>
          <ul className="space-y-1 max-h-24 overflow-y-auto">
            {foundValues.map(entry => (
              <li
                key={entry.address}
                onClick={() => handleSelectValue(entry)}
                className={`flex justify-between p-1.5 rounded text-xs cursor-pointer ${selectedValue?.address === entry.address ? 'bg-green-500/20' : 'hover:bg-gray-700'}`}
              >
                <span className="text-gray-500">{entry.address}</span>
                <span className="font-bold text-green-300">{entry.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedValue && ['editing', 'saving', 'saved'].includes(state) && (
        <div className="border-t-2 border-green-500/30 pt-4 mt-4 space-y-2">
           <label htmlFor="editValue" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1">
                <EditIcon className="h-4 w-4" />
                <span>Modify Value at {selectedValue.address}</span>
            </label>
           <div className="flex gap-2">
                <input
                    type="number"
                    id="editValue"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    disabled={state === 'saving' || state === 'saved'}
                    className="w-full bg-black/50 border border-gray-600 text-green-300 rounded-md p-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
                 <button
                    onClick={handleSave}
                    disabled={state === 'saving' || state === 'saved'}
                    className="flex items-center justify-center p-2 w-28 bg-blue-600 text-white rounded-md hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
                >
                    {state === 'saving' && <LoadingIcon className="h-5 w-5" />}
                    {state === 'saved' && <><CheckIcon className="h-5 w-5 mr-1"/> Saved</>}
                    {state === 'editing' && <><SaveIcon className="h-5 w-5 mr-1"/> Save</>}
                </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default ValueEditor;