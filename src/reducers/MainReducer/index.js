import {handleActions} from 'redux-actions'
import en_US from "../../languages/en_US";
import {setLanguageIndex, setActiveListItem, setDrawerOpen, setThemeIndex, setAutoUpdate, setUpdateChecked} from './Actions/MainActions';
import de_DE from "../../languages/de_DE";
import nl_NL from "../../languages/nl_NL";
import fr_FR from "../../languages/fr_FR";
import jp_JP from "../../languages/jp_JP";
import ru_RU from "../../languages/ru_RU";
import it_IT from "../../languages/it_IT";
import tr_TR from "../../languages/tr_TR";

let languageIndex = localStorage['languageIndex'];
let themeIndex = localStorage['themeIndex'];
let autoUpdate = localStorage['autoUpdate'];

if (!languageIndex) {
    languageIndex = 0;
} else {
    languageIndex = parseInt(languageIndex);
}

if (!themeIndex) {
    themeIndex = 0;
} else {
    themeIndex = parseInt(themeIndex);
}

if (!autoUpdate || autoUpdate === "true") autoUpdate = true;
else autoUpdate = "false";

const initState = {
    languageIndex: languageIndex,
    languages: [
        de_DE(),
        en_US(),
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
    checkedForUpdates: false
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
        window.localStorage['themeIndex'] = action.payload;
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
    }
}, initState);

export default MainReducer;
