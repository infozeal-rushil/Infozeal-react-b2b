import { RouteItems } from 'globals/components/routsdeclair/RouteInformation';
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react';

import useSitemap from 'sitemap';

interface MainLayoutContextInterface {
  contentClass: string;
  setContentClass: Dispatch<SetStateAction<string>>;
  footerClass: string;
  setFooterClass: Dispatch<SetStateAction<string>>;
  menuData: {
    routes: RouteItems[];
    isLoading: boolean;
    error: Error | null;
    refreshRoutes: () => Promise<void>;
  };
}

export const MainLayoutContext = createContext(
  {} as MainLayoutContextInterface
);

const MainLayoutProvider = ({ children }: PropsWithChildren) => {
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
