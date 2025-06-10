import React, { createContext, useContext, useState } from 'react';
export const CollapseContext = createContext({});
const PhoenixDocProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [showPreviewBtn, setShowPreviewBtn] = useState(true);
    const [textToCopy, setTextToCopy] = useState('');
    return (<CollapseContext.Provider value={{
            open,
            setOpen,
            showPreviewBtn,
            setShowPreviewBtn,
            textToCopy,
            setTextToCopy
        }}>
      {children}
    </CollapseContext.Provider>);
};
export const usePhoenixDocContext = () => useContext(CollapseContext);
export default PhoenixDocProvider;
