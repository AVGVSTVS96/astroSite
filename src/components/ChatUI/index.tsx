import { ChatBox } from './ChatBox';
import { ModelProvider } from './ModelContext';

const ChatUi = () => {
  return (
    <ModelProvider>
      <ChatBox />
    </ModelProvider>
  );
}; 

export default ChatUi;
