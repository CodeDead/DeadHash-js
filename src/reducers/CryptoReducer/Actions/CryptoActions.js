import {createAction} from 'redux-actions';

export const setMd5state = createAction("SET_MD5_STATE");
export const setSha1State = createAction("SET_SHA1_STATE");
export const setSha256State = createAction("SET_SHA256_STATE");
export const setSha384State = createAction("SET_SHA384_STATE");
export const setSha512State = createAction("SET_SHA512_STATE");
export const setRipeMd160State = createAction("SET_RIPEMD160_STATE");
export const setCRC32State = createAction("SET_CRC32_STATE");
