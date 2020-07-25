import {handleActions} from 'redux-actions'
import en_US from "../../languages/en_US";
import {
    setLanguageIndex,
    setActiveListItem,
    setThemeIndex,
    setAutoUpdate,
    setUpdateChecked,
    resetMainReducer, setMinimizeStatus, setMaximizeStatus, setLanguageButtonStatus, setCanDragDrop
} from './Actions';
import de_DE from "../../languages/de_DE";
import nl_NL from "../../languages/nl_NL";
import fr_FR from "../../languages/fr_FR";
import jp_JP from "../../languages/jp_JP";
import ru_RU from "../../languages/ru_RU";
import it_IT from "../../languages/it_IT";
import tr_TR from "../../languages/tr_TR";
import es_ES from "../../languages/es_ES";
import pt_PT from "../../languages/pt_PT";

const languageIndex = localStorage['languageIndex'] ? parseInt(localStorage['languageIndex']) : 1;
const themeIndex = localStorage['themeIndex'] ? parseInt(localStorage['themeIndex']) : 0;
const autoUpdate = !!(localStorage['autoUpdate'] && localStorage['autoUpdate'] === "true");
const minimizeEnabled = !!(localStorage['minimizeEnabled'] && localStorage['minimizeEnabled'] === "true");
const maximizeEnabled = !!(localStorage['maximizeEnabled'] && localStorage['maximizeEnabled'] === "true");
const languageEnabled = !!(localStorage['languageEnabled'] && localStorage['languageEnabled'] === "true");
const canDragDrop = !!(localStorage['canDragDrop'] && localStorage['canDragDrop'] === "true");

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
        localStorage['canDragDrop'] = true;

        return {
            ...state,
            languageIndex: 1,
            themeIndex: 0,
            autoUpdate: true,
            minimizeEnabled: true,
            maximizeEnabled: true,
            languageEnabled: true,
            canDragDrop: true
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
    },
    [setCanDragDrop](state, action) {
        localStorage['canDragDrop'] = action.payload;
        return {
            ...state,
            canDragDrop: action.payload
        }
    }
}, initState);

export default MainReducer;
