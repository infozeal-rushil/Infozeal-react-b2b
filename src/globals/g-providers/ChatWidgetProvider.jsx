import { supportChat } from '@globals/g-data/chat';
import dayjs from 'dayjs';
import { createContext, useState, useContext, useCallback } from 'react';
export const ChatWidgetContext = createContext({});
const ChatWidgetProvider = ({ children }) => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [conversation, setConversation] = useState(supportChat);
  const sentMessage = useCallback(
    ({ message, attachments }) => {
      const newMessages = [
        ...conversation.messages,
        {
          id: Date.now(),
          type: 'sent',
          time: dayjs().toNow(),
          readAt: null,
          message,
          attachments
        }
      ];
      const newConversation = Object.assign(Object.assign({}, conversation), {
        messages: newMessages
      });
      setConversation(newConversation);
    },
    [conversation]
  );
  return (
    <ChatWidgetContext.Provider
      value={{
        conversation,
        setConversation,
        isOpenChat,
        setIsOpenChat,
        sentMessage
      }}
    >
      {children}
    </ChatWidgetContext.Provider>
  );
};
export const useChatWidgetContext = () => useContext(ChatWidgetContext);
export default ChatWidgetProvider;
