import React, { createContext, useReducer } from 'react';
import MainReducer from '../../reducers/MainReducer';
// eslint-disable-next-line camelcase
import de_DE from '../../languages/de_DE';
// eslint-disable-next-line camelcase
import en_US from '../../languages/en_US';
// eslint-disable-next-line camelcase
import es_ES from '../../languages/es_ES';
// eslint-disable-next-line camelcase
import fr_FR from '../../languages/fr_FR';
// eslint-disable-next-line camelcase
import it_IT from '../../languages/it_IT';
// eslint-disable-next-line camelcase
import jp_JP from '../../languages/jp_JP';
// eslint-disable-next-line camelcase
import nl_NL from '../../languages/nl_NL';
// eslint-disable-next-line camelcase
import pt_PT from '../../languages/pt_PT';
// eslint-disable-next-line camelcase
import ru_RU from '../../languages/ru_RU';
// eslint-disable-next-line camelcase
import tr_TR from '../../languages/tr_TR';

const languageIndex = localStorage.languageIndex ? parseFloat(localStorage.languageIndex) : 1;
const themeStyle = localStorage.themeStyle ? localStorage.themeStyle : 'light';
const themeIndex = localStorage.themeIndex ? parseFloat(localStorage.themeIndex) : 0;
const autoUpdate = localStorage.autoUpdate && localStorage.autoUpdate === 'true' ? true : !localStorage.autoUpdate;
const minimizeEnabled = localStorage.minimizeEnabled && localStorage.minimizeEnabled === 'true' ? true : !localStorage.minimizeEnabled;
const maximizeEnabled = localStorage.maximizeEnabled && localStorage.maximizeEnabled === 'true' ? true : !localStorage.maximizeEnabled;
const languageEnabled = localStorage.languageEnabled && localStorage.languageEnabled === 'true' ? true : !localStorage.languageEnabled;
const themeToggleEnabled = localStorage.themeToggleEnabled && localStorage.themeToggleEnabled === 'true' ? true : !localStorage.themeToggleEnabled;
const canDragDrop = localStorage.canDragDrop && localStorage.canDragDrop === 'true' ? true : !localStorage.canDragDrop;

const initState = {
  languageIndex,
  languages: [
    de_DE(),
    en_US(),
    es_ES(),
    fr_FR(),
    it_IT(),
    jp_JP(),
    nl_NL(),
    pt_PT(),
    ru_RU(),
    tr_TR(),
  ],
  drawerOpen: false,
  selectedListItem: 0,
  themeStyle,
  themeIndex,
  autoUpdate,
  checkedForUpdates: false,
  minimizeEnabled,
  maximizeEnabled,
  languageEnabled,
  themeToggleEnabled,
  canDragDrop,
};

export const MainContext = createContext(initState);

const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initState);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MainContext.Provider value={[state, dispatch]}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
