import {handleActions} from 'redux-actions'
import en_US from "../../languages/en_US";
import {
    setLanguageIndex,
    setActiveListItem,
    setDrawerOpen,
    setThemeIndex,
    setAutoUpdate,
    setUpdateChecked,
    resetMainReducer, setMinimizeStatus, setMaximizeStatus, setLanguageButtonStatus
} from './Actions/MainActions';
import de_DE from "../../languages/de_DE";
import nl_NL from "../../languages/nl_NL";
import fr_FR from "../../languages/fr_FR";
import jp_JP from "../../languages/jp_JP";
import ru_RU from "../../languages/ru_RU";
import it_IT from "../../languages/it_IT";
import tr_TR from "../../languages/tr_TR";
import es_ES from "../../languages/es_ES";

let languageIndex = localStorage['languageIndex'];
let themeIndex = localStorage['themeIndex'];
let autoUpdate = localStorage['autoUpdate'];
let minimizeEnabled = localStorage['minimizeEnabled'];
let maximizeEnabled = localStorage['maximizeEnabled'];
let languageEnabled = localStorage['languageEnabled'];

if (!languageIndex) {
    languageIndex = 1;
} else {
    languageIndex = parseInt(languageIndex);
}

if (!themeIndex) {
    themeIndex = 0;
} else {
    themeIndex = parseInt(themeIndex);
}

autoUpdate = !autoUpdate || autoUpdate === "true";
minimizeEnabled = !minimizeEnabled || minimizeEnabled === "true";
maximizeEnabled = !maximizeEnabled || maximizeEnabled === "true";
languageEnabled = !languageEnabled || languageEnabled === "true";

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
        ru_RU(),
        tr_TR()
    ],
    drawerOpen: false,
    selectedListItem: 0,
    themeIndex: themeIndex,
    autoUpdate: autoUpdate,
    version: {
        majorVersion: 2,
        minorVersion: 0,
        buildVersion: 0,
        revisionVersion: 0
    },
    checkedForUpdates: false,
    minimizeEnabled: minimizeEnabled,
    maximizeEnabled: maximizeEnabled,
    languageEnabled: languageEnabled
};

const MainReducer = handleActions({
    [setLanguageIndex](state, action) {
        localStorage['languageIndex'] = action.index;
        return {
            ...state,
            languageIndex: action.index
        }
    },
    [setActiveListItem](state, action) {
        return {
            ...state,
            selectedListItem: action.index
        }
    },
    [setDrawerOpen](state, action) {
        return {
            ...state,
            drawerOpen: action.drawerOpen
        }
    },
    [setThemeIndex](state, action) {
        localStorage['themeIndex'] = action.payload;
        return {
            ...state,
            themeIndex: action.payload
        }
    },
    [setAutoUpdate](state, action) {
        localStorage['autoUpdate'] = action.payload;
        return {
            ...state,
            autoUpdate: action.payload
        }
    },
    [setUpdateChecked](state, action) {
        return {
            ...state,
            checkedForUpdates: action.payload
        }
    },
    [resetMainReducer](state) {
        localStorage['languageIndex'] = 1;
        localStorage['themeIndex'] = 0;
        localStorage['autoUpdate'] = true;
        localStorage['minimizeEnabled'] = true;
        localStorage['maximizeEnabled'] = true;
        localStorage['languageEnabled'] = true;

        return {
            ...state,
            languageIndex: 1,
            themeIndex: 0,
            autoUpdate: true,
            minimizeEnabled: true,
            maximizeEnabled: true,
            languageEnabled: true
        }
    },
    [setMinimizeStatus](state, action) {
        localStorage['minimizeEnabled'] = action.payload;
        return {
            ...state,
            minimizeEnabled: action.payload
        }
    },
    [setMaximizeStatus](state, action) {
        localStorage['maximizeEnabled'] = action.payload;
        return {
            ...state,
            maximizeEnabled: action.payload
        }
    },
    [setLanguageButtonStatus](state, action) {
        localStorage['languageEnabled'] = action.payload;
        return {
            ...state,
            languageEnabled: action.payload
        }
    }
}, initState);

export default MainReducer;
