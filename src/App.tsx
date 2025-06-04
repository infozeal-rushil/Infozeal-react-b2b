// import SettingsPanel from 'globals/components/settings-panel/SettingsPanel';
// import SettingsToggle from 'globals/components/settings-panel/SettingsToggle';
import useToggleStyle from 'globals/hooks/useToggleStyle';
import { useAppContext } from 'globals/providers/AppProvider';
// import { useSettingsPanelContext } from 'globals/providers/SettingsPanelProvider';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from 'globals/providers/AuthProvider';
import { Provider } from 'react-redux';
import { store } from 'globals/store/Index';

const App = () => {
  const { isStylesheetLoaded } = useToggleStyle();
  const { pathname } = useLocation();

  // const {
  //   settingsPanelConfig: { showSettingPanelButton },
  //   setSettingsPanelConfig
  // } = useSettingsPanelContext();

  const {
    config: { theme, isRTL }
  } = useAppContext();

  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    // setSettingsPanelConfig({
    //   openSettingPanel: false
    // });
  }, [isRTL]);

  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          {!isStylesheetLoaded ? (
            <div
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: theme === 'dark' ? '#000' : '#fff'
              }}
            />
          ) : (
            <>
              <Outlet />
              {/* {showSettingPanelButton && (
            <>
              <SettingsToggle />
              <SettingsPanel />
            </>
          )} */}
            </>
          )}
        </AuthProvider>
      </Provider>
    </>
  );
};

export default App;
