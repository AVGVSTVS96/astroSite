import { useState } from 'react';
import { setModel } from '../modelStore'; // Adjust the relative path as needed

export const useModel = (defaultModel: string) => {
  const isBrowser = typeof window !== 'undefined' && window.localStorage;
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    if (isBrowser) {
      return localStorage.getItem('selectedModel') || defaultModel;
    }
    return defaultModel;
  });

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    if (isBrowser) {
      localStorage.setItem('selectedModel', model);
    }
    // Update the global model store so that other parts (like our fetch function) see the new value.
    setModel(model);
  };

  return {
    selectedModel,
    handleModelChange,
  };
};

