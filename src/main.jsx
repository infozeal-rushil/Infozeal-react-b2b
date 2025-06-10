// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@src/Routes';
import AppProvider from '@globals/g-providers/AppProvider';
import BreakpointsProvider from '@globals/g-providers/BreakpointsProvider';
import SettingsPanelProvider from '@globals/g-providers/SettingsPanelProvider';
import ChatWidgetProvider from '@globals/g-providers/ChatWidgetProvider';
createRoot(document.getElementById('root')).render(
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
