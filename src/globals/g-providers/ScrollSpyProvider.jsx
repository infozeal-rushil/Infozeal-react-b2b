import { createContext, useContext, useState } from 'react';
export const ScrollSpyContext = createContext({});
const ScrollSpyProvider = ({ children }) => {
    const [activeElemId, setActiveElemId] = useState('');
    const [visibleItems, setVisibleItems] = useState([]);
    return (<ScrollSpyContext.Provider value={{ activeElemId, setActiveElemId, visibleItems, setVisibleItems }}>
      {children}
    </ScrollSpyContext.Provider>);
};
export const useScrollSpyContext = () => useContext(ScrollSpyContext);
export default ScrollSpyProvider;
