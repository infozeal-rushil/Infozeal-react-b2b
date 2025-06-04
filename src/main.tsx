// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from 'Routes';
import AppProvider from 'globals/providers/AppProvider';
import BreakpointsProvider from 'globals/providers/BreakpointsProvider';
import SettingsPanelProvider from 'globals/providers/SettingsPanelProvider';
import ChatWidgetProvider from 'globals/providers/ChatWidgetProvider';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AppProvider>
    <SettingsPanelProvider>
      <ChatWidgetProvider>
        <BreakpointsProvider>
          <RouterProvider router={router} />
        </BreakpointsProvider>
      </ChatWidgetProvider>
    </SettingsPanelProvider>
  </AppProvider>
  // </StrictMode>
);
