import React, {createContext, useReducer} from "react";
import MainReducer from "../../reducers/MainReducer";
import de_DE from "../../languages/de_DE";
import en_US from "../../languages/en_US";
import es_ES from "../../languages/es_ES";
import fr_FR from "../../languages/fr_FR";
import it_IT from "../../languages/it_IT";
import jp_JP from "../../languages/jp_JP";
import nl_NL from "../../languages/nl_NL";
import pt_PT from "../../languages/pt_PT";
import ru_RU from "../../languages/ru_RU";
import tr_TR from "../../languages/tr_TR";

const languageIndex = localStorage['languageIndex'] ? parseInt(localStorage['languageIndex']) : 1;
const themeIndex = localStorage['themeIndex'] ? parseInt(localStorage['themeIndex']) : 0;
const autoUpdate = localStorage['autoUpdate'] && localStorage['autoUpdate'] === "true" ? true : !localStorage['autoUpdate'];
const minimizeEnabled = localStorage['minimizeEnabled'] && localStorage['minimizeEnabled'] === "true" ? true : !localStorage['minimizeEnabled'];
const maximizeEnabled = localStorage['maximizeEnabled'] && localStorage['maximizeEnabled'] === "true" ? true : !localStorage['maximizeEnabled'];
const languageEnabled = localStorage['languageEnabled'] && localStorage['languageEnabled'] === "true" ? true : !localStorage['languageEnabled'];
const canDragDrop = localStorage['canDragDrop'] && localStorage['canDragDrop'] === "true" ? true : !localStorage['canDragDrop'];

const initState = {
    languageIndex: languageIndex,
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
        tr_TR()
    ],
    drawerOpen: false,
    selectedListItem: 0,
    themeIndex: themeIndex,
    autoUpdate: autoUpdate,
    checkedForUpdates: false,
    minimizeEnabled: minimizeEnabled,
    maximizeEnabled: maximizeEnabled,
    languageEnabled: languageEnabled,
    canDragDrop: canDragDrop
};

export const MainContext = createContext(initState);

const MainContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(MainReducer, initState);

    return (
        <MainContext.Provider value={[state, dispatch]}>
            {children}
        </MainContext.Provider>
    );
};

export default MainContextProvider;
