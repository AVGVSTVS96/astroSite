import { useEffect, useState } from 'react';

export const useModel = (defaultModel: string) => {
  const localStorageAvailable = typeof window !== 'undefined' && window.localStorage;
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    if (localStorageAvailable) {
      return localStorage.getItem('selectedModel') || defaultModel;
    }

    return defaultModel;
  });

  const handleModelChange = (model: string) => {
    setSelectedModel(model);

    if (localStorageAvailable) {
      localStorage.setItem('selectedModel', model);
    }
  };

  useEffect(() => {
    const sendModelName = async () => {
      await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          modelName: selectedModel
        })
      });
    };

    sendModelName();
  }, [selectedModel]);
  return {
    selectedModel,
    handleModelChange
  };
};
  