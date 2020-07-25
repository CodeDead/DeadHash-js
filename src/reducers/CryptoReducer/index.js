import {handleActions} from "redux-actions";
import {
    setMd5state,
    setRipeMd160State,
    setSha1State,
    setSha256State,
    setSha384State,
    setSha512State,
    setSha3State,
    setSha224State, resetCryptoReducer, setTextHashes, setFileHashes, setTextInput, setCurrentFile
} from "./Actions";

const md5 = !!(localStorage['md5'] && localStorage['md5'] === "true");
const sha1 = !!(localStorage['sha1'] && localStorage['sha1'] === "true");
const sha3 = !!(localStorage['sha3'] && localStorage['sha3'] === "true");
const sha224 = !!(localStorage['sha224'] && localStorage['sha224'] === "true");
const sha256 = !!(localStorage['sha256'] && localStorage['sha256'] === "true");
const sha384 = !!(localStorage['sha384'] && localStorage['sha384'] === "true");
const sha512 = !!(localStorage['sha512'] && localStorage['sha512'] === "true");
const ripemd160 = !!(localStorage['ripemd160'] && localStorage['ripemd160'] === "true");

const initState = {
    md5: md5,
    sha1: sha1,
    sha224: sha224,
    sha256: sha256,
    sha3: sha3,
    sha384: sha384,
    sha512: sha512,
    ripemd160: ripemd160,
    fileHashes: null,
    textHashes: null,
    textInput: "",
    currentFile: null
};

const CryptoReducer = handleActions({
    [setMd5state](state, action) {
        localStorage['md5'] = action.payload;
        return {
            ...state,
            md5: action.payload
        }
    },
    [setSha1State](state, action) {
        localStorage['sha1'] = action.payload;
        return {
            ...state,
            sha1: action.payload
        }
    },
    [setSha256State](state, action) {
        localStorage['sha256'] = action.payload;
        return {
            ...state,
            sha256: action.payload
        }
    },
    [setSha384State](state, action) {
        localStorage['sha384'] = action.payload;
        return {
            ...state,
            sha384: action.payload
        }
    },
    [setSha512State](state, action) {
        localStorage['sha512'] = action.payload;
        return {
            ...state,
            sha512: action.payload
        }
    },
    [setRipeMd160State](state, action) {
        localStorage['ripemd160'] = action.payload;
        return {
            ...state,
            ripemd160: action.payload
        }
    },
    [setSha3State](state, action) {
        localStorage['sha3'] = action.payload;
        return {
            ...state,
            sha3: action.payload
        }
    },
    [setSha224State](state, action) {
        localStorage['sha224'] = action.payload;
        return {
            ...state,
            sha224: action.payload
        }
    },
    [resetCryptoReducer]() {
        localStorage['md5'] = true;
        localStorage['sha1'] = true;
        localStorage['sha256'] = true;
        localStorage['sha384'] = true;
        localStorage['sha512'] = true;
        localStorage['ripemd160'] = true;
        localStorage['sha3'] = true;
        localStorage['sha224'] = true;
        return {
            md5: true,
            sha1: true,
            sha224: true,
            sha256: true,
            sha3: true,
            sha384: true,
            sha512: true,
            ripemd160: true,
        }
    },
    [setTextHashes](state, action) {
        return {
            ...state,
            textHashes: action.payload
        }
    },
    [setFileHashes](state, action) {
        return {
            ...state,
            fileHashes: action.payload
        }
    },
    [setTextInput](state, action) {
        return {
            ...state,
            textInput: action.payload
        }
    },
    [setCurrentFile](state, action) {
        return {
            ...state,
            currentFile: action.payload,
            fileHashes: null
        }
    }
}, initState);

export default CryptoReducer;
