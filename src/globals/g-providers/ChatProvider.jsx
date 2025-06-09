import React, { createContext, useContext, useReducer } from 'react';
import { SET_CHAT_STATE, chatReducer } from 'reducers/ChatReducer';
export const ChatContext = createContext({});
const ChatProvider = ({ children, conversations }) => {
    const initState = {
        conversations: conversations,
        currentConversation: null,
        filterBy: 'all',
        showUserListOffcanvas: false,
        showConversationDetails: false
    };
    const [chatState, chatDispatch] = useReducer(chatReducer, initState);
    const setShowConversationDetails = (value) => {
        chatDispatch({
            type: SET_CHAT_STATE,
            payload: { showConversationDetails: value }
        });
    };
    const setShowUserListOffcanvas = (value) => {
        chatDispatch({
            type: SET_CHAT_STATE,
            payload: { showUserListOffcanvas: value }
        });
    };
    return (<ChatContext.Provider value={Object.assign(Object.assign({}, chatState), { chatDispatch,
            setShowConversationDetails,
            setShowUserListOffcanvas })}>
      {children}
    </ChatContext.Provider>);
};
export const useChatContext = () => useContext(ChatContext);
export default ChatProvider;
