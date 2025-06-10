import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
//Action types
export const SET_CHAT_STATE = 'SET_CHAT_STATE';
export const SENT_MESSAGE = 'SENT_MESSAGE';
export const SET_CURRENT_CONVERSATION = 'SET_CURRENT_CONVERSATION';
export const FILTER_CONVERSION_LIST = 'FILTER_CONVERSION_LIST';
export const MARKED_AS_READ = 'MARKED_AS_READ';
export const RESET = 'RESET';
export const chatReducer = (state, action) => {
    switch (action.type) {
        case SET_CHAT_STATE: {
            const { payload } = action;
            return Object.assign(Object.assign({}, state), payload);
        }
        case SENT_MESSAGE: {
            const { payload } = action;
            const conversations = state.conversations.map(conversation => conversation.id === payload.conversationId
                ? Object.assign(Object.assign({}, conversation), { messages: [
                        ...conversation.messages,
                        {
                            id: 3,
                            type: 'sent',
                            time: dayjs().toNow(),
                            readAt: null,
                            message: payload.message,
                            attachments: payload.attachments
                        }
                    ] }) : conversation);
            return Object.assign(Object.assign({}, state), { conversations });
        }
        case SET_CURRENT_CONVERSATION: {
            const { payload } = action;
            const conversation = state.conversations.find(conversation => conversation.user.id === Number(payload.userId));
            return Object.assign(Object.assign({}, state), { currentConversation: conversation || null });
        }
        case FILTER_CONVERSION_LIST: {
            const { payload } = action;
            const conversations = state.conversations.filter(conversation => {
                const hasUnreadMeassages = conversation.messages.some(message => !message.readAt);
                return payload === 'read'
                    ? !hasUnreadMeassages
                    : payload === 'unread'
                        ? hasUnreadMeassages
                        : true;
            });
            return Object.assign(Object.assign({}, state), { conversations });
        }
        case MARKED_AS_READ: {
            const { payload } = action;
            const conversations = state.conversations.map(conversation => {
                if (conversation.id === payload.conversationId) {
                    return Object.assign(Object.assign({}, conversation), { messages: conversation.messages.map(message => (Object.assign(Object.assign({}, message), { readAt: new Date() }))) });
                }
                else {
                    return conversation;
                }
            });
            return Object.assign(Object.assign({}, state), { conversations: conversations });
        }
        case RESET:
            return Object.assign({}, state);
        default:
            return state;
    }
};
