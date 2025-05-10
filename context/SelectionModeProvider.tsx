import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SelectionModeContextType {
  selectionMode: boolean;
  selectedLogs: string[];
  setSelectionMode: (value: boolean) => void;
  setSelectedLogs: React.Dispatch<React.SetStateAction<string[]>>;
  toggleSelectionMode: () => void;
  toggleLogSelection: (selection: string[]) => void;
}

const SelectionModeContext = createContext<SelectionModeContextType | undefined>(undefined);

export const SelectionModeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedLogs([]);  // Clear selections when exiting selection mode
    }
  };

  const toggleLogSelection = (selection: string[]) => {
    setSelectedLogs(selection);
  };

  return (
    <SelectionModeContext.Provider 
      value={{ 
        selectionMode, 
        selectedLogs, 
        setSelectionMode, 
        setSelectedLogs,
        toggleSelectionMode,
        toggleLogSelection
      }}
    >
      {children}
    </SelectionModeContext.Provider>
  );
};

export const useSelectionMode = () => {
  const context = useContext(SelectionModeContext);
  if (context === undefined) {
    throw new Error('useSelectionMode must be used within a SelectionModeProvider');
  }
  return context;
};