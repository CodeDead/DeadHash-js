import {createAction} from 'redux-actions';

export const setMd5state = createAction("SET_MD5_STATE");
export const setSha1State = createAction("SET_SHA1_STATE");
export const setSha256State = createAction("SET_SHA256_STATE");
export const setSha384State = createAction("SET_SHA384_STATE");
export const setSha512State = createAction("SET_SHA512_STATE");
export const setRipeMd160State = createAction("SET_RIPEMD160_STATE");
export const setSha224State = createAction("SET_SHA224_STATE");
export const setSha3State = createAction("SET_SHA3_STATE");
export const resetCryptoReducer = createAction("RESET_CRYPTO_REDUCER");
export const setFileHashes = createAction("SET_FILE_HASHES");
export const setTextHashes = createAction("SET_TEXT_HASHES");
export const setTextInput = createAction("SET_TEXT_INPUT");
export const setCurrentFile = createAction("SET_CURRENT_FILE");
