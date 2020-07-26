import React, {createContext, useReducer} from "react";
import CryptoReducer from "../../reducers/CryptoReducer";

const md5 = localStorage['md5'] && localStorage['md5'] === "true" ? true : !localStorage['md5'];
const sha1 = localStorage['sha1'] && localStorage['sha1'] === "true" ? true : !localStorage['sha1'];
const sha3 = localStorage['sha3'] && localStorage['sha3'] === "true" ? true : !localStorage['sha3'];
const sha224 = localStorage['sha224'] && localStorage['sha224'] === "true" ? true : !localStorage['sha224'];
const sha256 = localStorage['sha256'] && localStorage['sha256'] === "true" ? true : !localStorage['sha256'];
const sha384 = localStorage['sha384'] && localStorage['sha384'] === "true" ? true : !localStorage['sha384'];
const sha512 = localStorage['sha512'] && localStorage['sha512'] === "true" ? true : !localStorage['sha512'];
const ripemd160 = localStorage['ripemd160'] && localStorage['ripemd160'] === "true" ? true : !localStorage['ripemd160'];

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

export const CryptoContext = createContext(initState);

const CryptoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(CryptoReducer, initState);

    return (
        <CryptoContext.Provider value={[state, dispatch]}>
            {children}
        </CryptoContext.Provider>
    );
};

export default CryptoContextProvider;
