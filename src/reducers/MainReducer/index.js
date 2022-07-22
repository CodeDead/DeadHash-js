import {
  RESET_MAIN_REDUCER,
  SET_ACTIVE_LIST_ITEM,
  SET_AUTO_UPDATE,
  SET_CAN_DRAG_DROP,
  SET_LANGUAGE_INDEX,
  SET_LANGUAGE_STATUS,
  SET_MAXIMIZE_STATUS,
  SET_MINIMIZE_STATUS,
  SET_THEME_INDEX,
  SET_THEME_STYLE,
  SET_THEME_TOGGLE_STATUS,
  SET_UPDATE_CHECKED,
} from './Actions/actionTypes';

const MainReducer = (state, action) => {
  switch (action.type) {
    case SET_LANGUAGE_INDEX:
      localStorage.languageIndex = action.payload;
      return {
        ...state,
        languageIndex: action.payload,
      };
    case SET_ACTIVE_LIST_ITEM:
      return {
        ...state,
        selectedListItem: action.payload,
      };
    case SET_THEME_INDEX:
      localStorage.themeIndex = action.payload;
      return {
        ...state,
        themeIndex: action.payload,
      };
    case SET_THEME_STYLE:
      localStorage.themeStyle = action.payload;
      return {
        ...state,
        themeStyle: action.payload,
      };
    case SET_AUTO_UPDATE:
      localStorage.autoUpdate = action.payload;
      return {
        ...state,
        autoUpdate: action.payload,
      };
    case SET_UPDATE_CHECKED:
      return {
        ...state,
        checkedForUpdates: action.payload,
      };
    case RESET_MAIN_REDUCER:
      localStorage.languageIndex = 1;
      localStorage.themeStyle = 'light';
      localStorage.themeIndex = 0;
      localStorage.autoUpdate = true;
      localStorage.minimizeEnabled = true;
      localStorage.maximizeEnabled = true;
      localStorage.languageEnabled = false;
      localStorage.canDragDrop = true;
      localStorage.themeToggleEnabled = false;

      return {
        ...state,
        languageIndex: 1,
        themeStyle: 'light',
        themeIndex: 0,
        autoUpdate: true,
        minimizeEnabled: true,
        maximizeEnabled: true,
        languageEnabled: false,
        canDragDrop: true,
        themeToggleEnabled: false,
      };
    case SET_MINIMIZE_STATUS:
      localStorage.minimizeEnabled = action.payload;
      return {
        ...state,
        minimizeEnabled: action.payload,
      };
    case SET_MAXIMIZE_STATUS:
      localStorage.maximizeEnabled = action.payload;
      return {
        ...state,
        maximizeEnabled: action.payload,
      };
    case SET_LANGUAGE_STATUS:
      localStorage.languageEnabled = action.payload;
      return {
        ...state,
        languageEnabled: action.payload,
      };
    case SET_THEME_TOGGLE_STATUS:
      localStorage.themeToggleEnabled = action.payload;
      return {
        ...state,
        themeToggleEnabled: action.payload,
      };
    case SET_CAN_DRAG_DROP:
      localStorage.canDragDrop = action.payload;
      return {
        ...state,
        canDragDrop: action.payload,
      };
    default:
      return state;
  }
};

export default MainReducer;
