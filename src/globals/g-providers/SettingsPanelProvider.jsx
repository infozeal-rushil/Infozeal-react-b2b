import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from './AppProvider';
export const SettingsPanelContext = createContext({});
const SettingsPanelProvider = ({ children }) => {
  const {
    config: { navbarPosition }
  } = useAppContext();
  const [settingsPanelConfig, setSettingsPanelConfig] = useState({
    showSettingPanelButton: true,
    openSettingPanel: false,
    disableNavigationType: false,
    disableVerticalNavbarAppearance: false,
    disableHorizontalNavbarShape: false,
    disableHorizontalNavbarAppearance: false,
    disableResetButton: false
  });
  const updateSettingsPanelConfig = config => {
    setSettingsPanelConfig(
      Object.assign(Object.assign({}, settingsPanelConfig), config)
    );
  };
  useEffect(() => {
    if (navbarPosition === 'dual') {
      updateSettingsPanelConfig({
        disableHorizontalNavbarShape: true,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarAppearance: false
      });
    }
    if (navbarPosition === 'horizontal') {
      updateSettingsPanelConfig({
        disableHorizontalNavbarShape: false,
        disableVerticalNavbarAppearance: true,
        disableHorizontalNavbarAppearance: false
      });
    }
    if (navbarPosition === 'combo' || navbarPosition === 'vertical') {
      updateSettingsPanelConfig({
        disableHorizontalNavbarShape: false,
        disableVerticalNavbarAppearance: false,
        disableHorizontalNavbarAppearance: false
      });
    }
  }, [navbarPosition]);
  return (
    <SettingsPanelContext.Provider
      value={{
        settingsPanelConfig,
        setSettingsPanelConfig: updateSettingsPanelConfig
      }}
    >
      {children}
    </SettingsPanelContext.Provider>
  );
};
export default SettingsPanelProvider;
export const useSettingsPanelContext = () => useContext(SettingsPanelContext);
