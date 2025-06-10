import { useState, createContext, useContext } from 'react';
export const FaqTabContext = createContext({});
const FaqTabProvider = ({ children }) => {
    const [activeKey, setActiveKey] = useState('all');
    const [subCategoryActiveKey, setSubCategoryActiveKey] = useState('sale-101');
    const [isOpenOffcanvas, setIsOpenOffcanvas] = useState(false);
    return (<FaqTabContext.Provider value={{
            activeKey,
            setActiveKey,
            subCategoryActiveKey,
            setSubCategoryActiveKey,
            isOpenOffcanvas,
            setIsOpenOffcanvas
        }}>
      {children}
    </FaqTabContext.Provider>);
};
export const useFaqTabContext = () => useContext(FaqTabContext);
export default FaqTabProvider;
