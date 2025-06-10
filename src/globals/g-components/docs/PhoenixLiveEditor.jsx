import LiveProvider from './PhoenixLiveProvider';
import { LiveEditor } from 'react-live';
const PhoenixLiveEditor = props => {
  return (
    <LiveProvider {...props}>
      <LiveEditor />
    </LiveProvider>
  );
};
export default PhoenixLiveEditor;
