import { SettingsPanel } from './SettingsPanel';
import { ChatBox } from './ChatBox';

const ChatUI: React.FC = () => {
  return (
    <div className="flex flex-col-2 gap-4">
      <SettingsPanel />
      <ChatBox />
    </div>
  );
};

export default ChatUI;
