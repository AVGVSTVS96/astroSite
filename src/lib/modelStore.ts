// Initialize with your default model.
let currentModel = "gpt-4o-mini";

// Returns the current model.
export const getModel = () => currentModel;

// Updates the current model.
export const setModel = (model: string) => {
  currentModel = model;
};

