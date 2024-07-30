type DateOptions = Intl.DateTimeFormatOptions;

export const formatDate = (date: Date, options: DateOptions = {}) => {
  const defaultOptions: DateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const finalOptions = { ...defaultOptions, ...options };

  return new Date(date).toLocaleDateString('en-US', finalOptions);
};
