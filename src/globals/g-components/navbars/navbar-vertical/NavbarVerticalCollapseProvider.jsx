import React, { createContext, useContext, useState } from 'react';
const NavbarVerticalCollapseContext = createContext({});
const NavbarVerticalCollapseProvider = ({ children }) => {
    const [openItems, setOpenItems] = useState(['']);
    return (<NavbarVerticalCollapseContext.Provider value={{ openItems, setOpenItems }}>
      {children}
    </NavbarVerticalCollapseContext.Provider>);
};
export const useNavbarVerticalCollapse = () => useContext(NavbarVerticalCollapseContext);
export default NavbarVerticalCollapseProvider;
