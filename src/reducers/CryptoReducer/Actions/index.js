import {
  RESET_CRYPTO_REDUCER,
  SET_CURRENT_FILE,
  SET_FILE_COMPARE_HASH,
  SET_FILE_COMPARING,
  SET_FILE_HASH_ERROR,
  SET_FILE_HASH_LOADING,
  SET_FILE_HASHES,
  SET_MD4_STATE,
  SET_MD5_STATE,
  SET_RIPEMD160_STATE,
  SET_SHA1_STATE,
  SET_SHA224_STATE,
  SET_SHA256_STATE,
  SET_SHA384_STATE,
  SET_SHA512_STATE,
  SET_TEXT_COMPARE_HASH,
  SET_TEXT_COMPARING,
  SET_TEXT_HASH_ERROR,
  SET_TEXT_HASH_LOADING,
  SET_TEXT_HASHES,
  SET_TEXT_INPUT,
} from './actionTypes';

export const setMd4State = (state) => ({
  type: SET_MD4_STATE,
  payload: state,
});

export const setMd5State = (state) => ({
  type: SET_MD5_STATE,
  payload: state,
});

export const setSha1State = (state) => ({
  type: SET_SHA1_STATE,
  payload: state,
});

export const setSha256State = (state) => ({
  type: SET_SHA256_STATE,
  payload: state,
});

export const setSha384State = (state) => ({
  type: SET_SHA384_STATE,
  payload: state,
});

export const setSha512State = (state) => ({
  type: SET_SHA512_STATE,
  payload: state,
});

export const setRipeMd160State = (state) => ({
  type: SET_RIPEMD160_STATE,
  payload: state,
});

export const setSha224State = (state) => ({
  type: SET_SHA224_STATE,
  payload: state,
});

export const resetCryptoReducer = () => ({
  type: RESET_CRYPTO_REDUCER,
});

export const setFileHashes = (hashes) => ({
  type: SET_FILE_HASHES,
  payload: hashes,
});

export const setTextHashes = (hashes) => ({
  type: SET_TEXT_HASHES,
  payload: hashes,
});

export const setTextInput = (input) => ({
  type: SET_TEXT_INPUT,
  payload: input,
});

export const setCurrentFile = (currentFile) => ({
  type: SET_CURRENT_FILE,
  payload: currentFile,
});

export const setFileHashComparing = (comparing) => ({
  type: SET_FILE_COMPARING,
  payload: comparing,
});

export const setFileCompareHash = (hash) => ({
  type: SET_FILE_COMPARE_HASH,
  payload: hash,
});

export const setFileHashLoading = (loading) => ({
  type: SET_FILE_HASH_LOADING,
  payload: loading,
});

export const setTextHashComparing = (comparing) => ({
  type: SET_TEXT_COMPARING,
  payload: comparing,
});

export const setTextCompareHash = (hash) => ({
  type: SET_TEXT_COMPARE_HASH,
  payload: hash,
});

export const setTextHashLoading = (loading) => ({
  type: SET_TEXT_HASH_LOADING,
  payload: loading,
});

export const setTextHashError = (error) => ({
  type: SET_TEXT_HASH_ERROR,
  payload: error,
});

export const setFileHashError = (error) => ({
  type: SET_FILE_HASH_ERROR,
  payload: error,
});
