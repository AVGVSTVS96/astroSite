import { SettingsPanel } from './SettingsPanel';
import { Chat } from './Chat';

const ChatUI: React.FC = () => {
  return (
    <div className="relative flex flex-row gap-4">
      <SettingsPanel />
      <div className="flex grow">
        <Chat />
      </div>
    </div>
  );
};

export default ChatUI;
