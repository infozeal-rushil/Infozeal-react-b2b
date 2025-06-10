import React, { createContext, useContext, useState } from 'react';
import useSitemap from '@src/sitemap';
export const MainLayoutContext = createContext({});
const MainLayoutProvider = ({ children }) => {
  const [contentClass, setContentClass] = useState('');
  const [footerClass, setFooterClass] = useState('');
  // Integrate the sitemap hook
  const { routes, isLoading, error, refreshRoutes } = useSitemap();
  return (
    <MainLayoutContext.Provider
      value={{
        contentClass,
        setContentClass,
        footerClass,
        setFooterClass,
        menuData: {
          routes,
          isLoading,
          error,
          refreshRoutes
        }
      }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
};
export const useMainLayoutContext = () => useContext(MainLayoutContext);
export default MainLayoutProvider;
