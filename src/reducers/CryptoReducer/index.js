import {handleActions} from "redux-actions";
import {
    setMd5state,
    setRipeMd160State,
    setSha1State,
    setSha256State,
    setSha384State,
    setSha512State,
    setSha3State,
    setSha224State
} from "./Actions/CryptoActions";

let md5 = localStorage['md5'];
md5 = !md5 || md5 === "true";

let sha1 = localStorage['sha1'];
sha1 = !sha1 || sha1 === "true";

let sha3 = localStorage['sha3'];
sha3 = !sha3 || sha3 === "true";

let sha224 = localStorage['sha224'];
sha224 = !sha224 || sha224 === "true";

let sha256 = localStorage['sha256'];
sha256 = !sha256 || sha256 === "true";

let sha384 = localStorage['sha384'];
sha384 = !sha384 || sha384 === "true";

let sha512 = localStorage['sha512'];
sha512 = !sha512 || sha512 === "true";

let ripemd160 = localStorage['ripemd160'];
ripemd160 = !ripemd160 || ripemd160 === "true";


const initState = {
    md5: md5,
    sha1: sha1,
    sha224: sha224,
    sha256: sha256,
    sha3: sha3,
    sha384: sha384,
    sha512: sha512,
    ripemd160: ripemd160,
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
    }
}, initState);

export default CryptoReducer;
