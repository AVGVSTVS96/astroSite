import { useHotkeys } from 'react-hotkeys-hook';
import { mainLinks } from '@components/navLinks';
import { toggleTheme } from '@/lib/utils';

const GlobalHotKeys = () => {
  // Main link hotkeys
  const hotkeyString = mainLinks
    .filter((link) => link.shortcut)
    .map((link) => `${link.shortcut.toLowerCase()}`)
    .join(',');

  const executeHotKeyAction = (event: KeyboardEvent) => {
    event.preventDefault();
    const pressedKey = event.key.toLowerCase();
    const link = mainLinks.find(
      (link) => link.shortcut && link.shortcut.toLowerCase() === pressedKey
    );
    if (link) {
      window.location.href = link.href;
    }
  };

  useHotkeys(hotkeyString, executeHotKeyAction);

  // Theme toggle hotkey
  useHotkeys('t', toggleTheme);

  return null;
};

export default GlobalHotKeys;
