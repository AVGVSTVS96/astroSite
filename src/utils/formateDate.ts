type DateOptions = Intl.DateTimeFormatOptions & {
  weekday?: 'narrow' | 'short' | 'long';
  year?: '2-digit' | 'numeric';
  month?: '2-digit' | 'numeric' | 'narrow' | 'short' | 'long';
  day?: '2-digit' | 'numeric';
};

export const formatDate = (date: Date, options: DateOptions = {}) => {
  const defaultOptions: DateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const finalOptions = { ...defaultOptions, ...options };

  return new Date(date).toLocaleDateString('en-US', finalOptions);
};
