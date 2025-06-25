import React, { createContext, useContext, useEffect, useCallback, ReactNode, useRef } from 'react';

interface ESPDataRefreshContextType {
  triggerRefresh: () => void;
  addRefreshListener: (listener: () => void) => number;
  removeRefreshListener: (id: number) => void;
}

const ESPDataRefreshContext = createContext<ESPDataRefreshContextType | undefined>(undefined);

export function ESPDataRefreshProvider({ children }: { children: ReactNode }) {
  // Use refs to maintain listeners between renders
  const nextListenerIdRef = useRef(0);
  const listenersMapRef = useRef(new Map<number, () => void>());
  
  // Log when the provider mounts and unmounts
  useEffect(() => {
    console.log('ESPDataRefreshProvider mounted');
    return () => {
      console.log('ESPDataRefreshProvider unmounted');
      // Clean up all listeners when the provider unmounts
      listenersMapRef.current.clear();
    };
  }, []);

  const triggerRefresh = useCallback(() => {
    console.log(`Triggering refresh for ${listenersMapRef.current.size} listeners`);
    // Call all registered listeners with error handling
    listenersMapRef.current.forEach(listener => {
      try {
        listener();
      } catch (error) {
        console.error("Error in refresh listener:", error);
      }
    });
  }, []);

  const addRefreshListener = useCallback((listener: () => void): number => {
    const id = nextListenerIdRef.current++;
    listenersMapRef.current.set(id, listener);
    console.log(`Added refresh listener ID ${id}, total: ${listenersMapRef.current.size}`);
    return id;
  }, []);

  const removeRefreshListener = useCallback((id: number) => {
    const removed = listenersMapRef.current.delete(id);
    console.log(`Removed refresh listener ID ${id} (${removed ? 'success' : 'not found'}), remaining: ${listenersMapRef.current.size}`);
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const value = useRef({
    triggerRefresh,
    addRefreshListener,
    removeRefreshListener,
  }).current;

  return (
    <ESPDataRefreshContext.Provider value={value}>
      {children}
    </ESPDataRefreshContext.Provider>
  );
}

export function useESPDataRefresh() {
  const context = useContext(ESPDataRefreshContext);
  if (context === undefined) {
    throw new Error('useESPDataRefresh must be used within an ESPDataRefreshProvider');
  }
  return context;
}