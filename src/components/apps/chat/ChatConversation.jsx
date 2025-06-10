import ChatContent from '@globals/g-components/modules/chat/chat-content';
import ChatSidebar from '@globals/g-components/modules/chat/ChatSidebar';
import { useBreakpoints } from '@globals/g-providers/BreakpointsProvider';
import { useChatContext } from '@globals/g-providers/ChatProvider';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SET_CURRENT_CONVERSATION } from '@globals/g-reducers/ChatReducer';
const ChatConversation = () => {
    const { userId } = useParams();
    const { chatDispatch, conversations } = useChatContext();
    const { breakpoints } = useBreakpoints();
    useEffect(() => {
        chatDispatch({
            type: SET_CURRENT_CONVERSATION,
            payload: {
                userId
            }
        });
    }, [userId, conversations]);
    return (<>
      {breakpoints.up('sm') && <ChatSidebar />}
      <ChatContent />
    </>);
};
export default ChatConversation;
