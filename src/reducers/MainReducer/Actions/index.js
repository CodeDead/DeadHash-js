import {
  RESET_MAIN_REDUCER,
  SET_ACTIVE_LIST_ITEM,
  SET_AUTO_UPDATE, SET_CAN_DRAG_DROP,
  SET_LANGUAGE_INDEX, SET_LANGUAGE_STATUS, SET_MAXIMIZE_STATUS, SET_MINIMIZE_STATUS,
  SET_THEME_INDEX,
  SET_UPDATE_CHECKED,
} from './actionTypes';

export const setLanguageIndex = (index) => ({
  type: SET_LANGUAGE_INDEX,
  payload: index,
});

export const setActiveListItem = (item) => ({
  type: SET_ACTIVE_LIST_ITEM,
  payload: item,
});

export const setThemeIndex = (index) => ({
  type: SET_THEME_INDEX,
  payload: index,
});

export const setAutoUpdate = (autoUpdate) => ({
  type: SET_AUTO_UPDATE,
  payload: autoUpdate,
});

export const setUpdateChecked = (checked) => ({
  type: SET_UPDATE_CHECKED,
  payload: checked,
});

export const resetMainReducer = () => ({
  type: RESET_MAIN_REDUCER,
});

export const setMinimizeStatus = (status) => ({
  type: SET_MINIMIZE_STATUS,
  payload: status,
});

export const setMaximizeStatus = (status) => ({
  type: SET_MAXIMIZE_STATUS,
  payload: status,
});

export const setLanguageButtonStatus = (status) => ({
  type: SET_LANGUAGE_STATUS,
  payload: status,
});

export const setCanDragDrop = (status) => ({
  type: SET_CAN_DRAG_DROP,
  payload: status,
});
