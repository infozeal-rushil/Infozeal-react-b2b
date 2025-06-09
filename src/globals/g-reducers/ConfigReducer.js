import { initialConfig } from '@src/config';
import { setItemToStore } from '@globals/g-helpers/utils';
//Action types
export const SET_CONFIG = 'SET_CONFIG';
export const REFRESH = 'REFRESH';
export const RESET = 'RESET';
export const configReducer = (state, action) => {
  switch (action.type) {
    case SET_CONFIG: {
      const { payload } = action;
      Object.keys(payload).forEach(key => {
        if (
          [
            'theme',
            'navbarTopShape',
            'navbarPosition',
            'navbarTopAppearance',
            'navbarVerticalAppearance',
            'isRTL',
            'isDark',
            'isNavbarVerticalCollapsed',
            'isChatWidgetVisible'
          ].includes(key)
        ) {
          setItemToStore(key, String(payload[key]));
        }
      });
      return Object.assign(Object.assign({}, state), payload);
    }
    case REFRESH:
      return Object.assign({}, state);
    case RESET:
      localStorage.clear();
      return Object.assign({}, initialConfig);
    default:
      return state;
  }
};
