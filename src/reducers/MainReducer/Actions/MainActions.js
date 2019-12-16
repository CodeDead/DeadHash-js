import {createAction} from 'redux-actions';

export const setLanguageIndex = createAction("SET_LANGUAGEINDEX");
export const setDrawerOpen = createAction("SET_DRAWEROPEN");
export const setActiveListItem = createAction("SET_ACTIVE_LISTITEM");
export const setThemeIndex = createAction("SET_THEME_INDEX");
export const setAutoUpdate = createAction("SET_AUTO_UPDATE");
export const setUpdateChecked = createAction("SET_UPDATE_CHECKED");
export const resetMainReducer = createAction("RESET_MAIN_REDUCER");
export const setMinimizeStatus = createAction("SET_MINIMIZE_STATUS");
export const setMaximizeStatus = createAction("SET_MAXIMIZE_STATUS");
export const setLanguageButtonStatus = createAction("SET_LANGUAGE_STATUS");
