const disableTransitions = () => {
  const css = document.createElement('style');
  css.textContent = `
    * {
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -o-transition: none !important;
      -ms-transition: none !important;
      transition: none !important;
    }
  `;
  document.head.appendChild(css);
  requestAnimationFrame(() => {
    document.head.removeChild(css);
  });
};

export const useThemeToggle = () => {
  const toggleTheme = () => {
    const currentTheme =
      localStorage.getItem('themeToggle') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    disableTransitions();

    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('themeToggle', newTheme);
  };

  return { toggleTheme };
};
