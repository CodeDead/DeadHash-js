import {
    RESET_CRYPTO_REDUCER, SET_CURRENT_FILE, SET_FILE_HASHES,
    SET_MD5_STATE,
    SET_RIPEMD160_STATE,
    SET_SHA1_STATE, SET_SHA224_STATE,
    SET_SHA256_STATE,
    SET_SHA384_STATE, SET_SHA3_STATE,
    SET_SHA512_STATE, SET_TEXT_HASHES, SET_TEXT_INPUT
} from "./actionTypes";

export const setMd5State = (state) => ({
    type: SET_MD5_STATE,
    payload: state
});

export const setSha1State = (state) => ({
    type: SET_SHA1_STATE,
    payload: state
});


export const setSha256State = (state) => ({
    type: SET_SHA256_STATE,
    payload: state
});

export const setSha384State = (state) => ({
    type: SET_SHA384_STATE,
    payload: state
});

export const setSha512State = (state) => ({
    type: SET_SHA512_STATE,
    payload: state
});

export const setRipeMd160State = (state) => ({
    type: SET_RIPEMD160_STATE,
    payload: state
});

export const setSha224State = (state) => ({
    type: SET_SHA224_STATE,
    payload: state
});

export const setSha3State = (state) => ({
    type: SET_SHA3_STATE,
    payload: state
});

export const resetCryptoReducer = () => ({
    type: RESET_CRYPTO_REDUCER,
});

export const setFileHashes = (hashes) => ({
    type: SET_FILE_HASHES,
    payload: hashes
});

export const setTextHashes = (hashes) => ({
    type: SET_TEXT_HASHES,
    payload: hashes
});

export const setTextInput = (input) => ({
    type: SET_TEXT_INPUT,
    payload: input
});

export const setCurrentFile = (currentFile) => ({
    type: SET_CURRENT_FILE,
    payload: currentFile
});
