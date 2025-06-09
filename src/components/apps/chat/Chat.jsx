import { conversations } from '@globals/g-data/chat';
import ChatProvider from '@globals/g-providers/ChatProvider';
import { Outlet } from 'react-router-dom';
const Chat = () => {
    return (<ChatProvider conversations={conversations}>
      <div className="chat d-flex gap-3">
        <Outlet />
      </div>
    </ChatProvider>);
};
export default Chat;
