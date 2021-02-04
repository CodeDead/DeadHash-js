import {
  RESET_CRYPTO_REDUCER, SET_CRC32_STATE,
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
} from './Actions/actionTypes';

const CryptoReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
    case SET_MD4_STATE:
      localStorage.md4 = action.payload;
      return {
        ...state,
        md4: action.payload,
      };
    case SET_MD5_STATE:
      localStorage.md5 = action.payload;
      return {
        ...state,
        md5: action.payload,
      };
    case SET_SHA1_STATE:
      localStorage.sha1 = action.payload;
      return {
        ...state,
        sha1: action.payload,
      };
    case SET_SHA256_STATE:
      localStorage.sha256 = action.payload;
      return {
        ...state,
        sha256: action.payload,
      };
    case SET_SHA384_STATE:
      localStorage.sha384 = action.payload;
      return {
        ...state,
        sha384: action.payload,
      };
    case SET_SHA512_STATE:
      localStorage.sha512 = action.payload;
      return {
        ...state,
        sha512: action.payload,
      };
    case SET_RIPEMD160_STATE:
      localStorage.ripemd160 = action.payload;
      return {
        ...state,
        ripemd160: action.payload,
      };
    case SET_SHA224_STATE:
      localStorage.sha224 = action.payload;
      return {
        ...state,
        sha224: action.payload,
      };
    case SET_CRC32_STATE:
      localStorage.crc32 = action.payload;
      return {
        ...state,
        crc32: action.payload,
      };
    case RESET_CRYPTO_REDUCER:
      localStorage.md4 = true;
      localStorage.md5 = true;
      localStorage.sha1 = true;
      localStorage.sha256 = true;
      localStorage.sha384 = true;
      localStorage.sha512 = true;
      localStorage.ripemd160 = true;
      localStorage.sha224 = true;
      localStorage.crc32 = true;

      return {
        ...state,
        md4: true,
        md5: true,
        sha1: true,
        sha224: true,
        sha256: true,
        sha384: true,
        sha512: true,
        ripemd160: true,
        crc32: true,
      };
    case SET_TEXT_HASHES:
      return {
        ...state,
        textHashes: action.payload,
      };
    case SET_FILE_HASHES:
      return {
        ...state,
        fileHashes: action.payload,
      };
    case SET_TEXT_INPUT:
      return {
        ...state,
        textInput: action.payload,
      };
    case SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.payload,
        fileHashes: null,
      };
    case SET_FILE_COMPARING:
      return {
        ...state,
        fileComparing: action.payload,
      };
    case SET_FILE_COMPARE_HASH:
      return {
        ...state,
        fileCompareHash: action.payload,
      };
    case SET_FILE_HASH_LOADING:
      return {
        ...state,
        fileHashLoading: action.payload,
      };
    case SET_TEXT_COMPARING:
      return {
        ...state,
        textComparing: action.payload,
      };
    case SET_TEXT_COMPARE_HASH:
      return {
        ...state,
        textCompareHash: action.payload,
      };
    case SET_TEXT_HASH_LOADING:
      return {
        ...state,
        textHashLoading: action.payload,
      };
    case SET_TEXT_HASH_ERROR:
      return {
        ...state,
        textErrorMessage: action.payload,
      };
    case SET_FILE_HASH_ERROR:
      return {
        ...state,
        fileErrorMessage: action.payload,
      };
  }
};

export default CryptoReducer;
