import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_MODEL } from './ModelSelector';

interface ModelContextProps {
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined);

export const ModelProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedModel') || DEFAULT_MODEL;
    }
    return DEFAULT_MODEL;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedModel', selectedModel);
    }
  }, [selectedModel]);

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModelContext = (): ModelContextProps => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModelContext must be used within a ModelProvider');
  }
  return context;
};

