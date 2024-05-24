import { SettingsPanel } from './SettingsPanel';
import { ChatBox } from './ChatBox';

const ChatUI: React.FC = () => {
  return (
    <div className="relative flex flex-row gap-4">
      <SettingsPanel />
      <div className="flex grow">
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatUI;
