import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Session } from '@/models/session';

// Define a type that can represent both Session objects and device logs
export type LogType = Session | {
  name?: string;
  fileName?: string;
  date?: string;
  [key: string]: any;
};

interface SelectionModeContextType {
  selectionMode: boolean;
  selectedLogs: LogType[];
  setSelectionMode: (value: boolean) => void;
  setSelectedLogs: React.Dispatch<React.SetStateAction<LogType[]>>;
  toggleSelectionMode: () => void;
  toggleLogSelection: (selection: LogType[]) => void;
}

const SelectionModeContext = createContext<SelectionModeContextType | undefined>(undefined);

export const SelectionModeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedLogs, setSelectedLogs] = useState<LogType[]>([]);

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      setSelectedLogs([]);  // Clear selections when exiting selection mode
    }
  };

  const toggleLogSelection = (selection: LogType[]) => {
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