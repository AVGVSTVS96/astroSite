/**
 * Disable transitions during theme toggle to prevent transitioning between
 * light and dark mode.
 */
const disableTransitions = () => {
  const css = document.createElement('style');
  css.textContent = `* { transition: none !important; }`;
  document.head.appendChild(css);

  // setTimeout(0) schedules style removal for the next event loop,
  // allowing the disabling styles to be applied successfully before removal
  setTimeout(() => {
    document.head.removeChild(css);
  }, 0);
};

export const toggleTheme = () => {
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
