import {
  RESET_CRYPTO_REDUCER,
  SET_CRC1_STATE,
  SET_CRC8_STATE,
  SET_CRC16_STATE,
  SET_CRC24_STATE,
  SET_CRC32_STATE,
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
  const { type, payload } = action;
  switch (type) {
    case SET_MD4_STATE:
      localStorage.md4 = payload;
      return {
        ...state,
        md4: payload,
      };
    case SET_MD5_STATE:
      localStorage.md5 = payload;
      return {
        ...state,
        md5: payload,
      };
    case SET_SHA1_STATE:
      localStorage.sha1 = payload;
      return {
        ...state,
        sha1: payload,
      };
    case SET_SHA256_STATE:
      localStorage.sha256 = payload;
      return {
        ...state,
        sha256: payload,
      };
    case SET_SHA384_STATE:
      localStorage.sha384 = payload;
      return {
        ...state,
        sha384: payload,
      };
    case SET_SHA512_STATE:
      localStorage.sha512 = payload;
      return {
        ...state,
        sha512: payload,
      };
    case SET_RIPEMD160_STATE:
      localStorage.ripemd160 = payload;
      return {
        ...state,
        ripemd160: payload,
      };
    case SET_SHA224_STATE:
      localStorage.sha224 = payload;
      return {
        ...state,
        sha224: payload,
      };
    case SET_CRC1_STATE:
      localStorage.crc1 = payload;
      return {
        ...state,
        crc1: payload,
      };
    case SET_CRC8_STATE:
      localStorage.crc8 = payload;
      return {
        ...state,
        crc8: payload,
      };
    case SET_CRC16_STATE:
      localStorage.crc16 = payload;
      return {
        ...state,
        crc16: payload,
      };
    case SET_CRC24_STATE:
      localStorage.crc24 = payload;
      return {
        ...state,
        crc24: payload,
      };
    case SET_CRC32_STATE:
      localStorage.crc32 = payload;
      return {
        ...state,
        crc32: payload,
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
      localStorage.crc1 = false;
      localStorage.crc8 = false;
      localStorage.crc16 = false;
      localStorage.crc24 = false;
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
        crc1: false,
        crc8: false,
        crc16: false,
        crc24: false,
        crc32: true,
      };
    case SET_TEXT_HASHES:
      return {
        ...state,
        textHashes: payload,
      };
    case SET_FILE_HASHES:
      return {
        ...state,
        fileHashes: payload,
      };
    case SET_TEXT_INPUT:
      return {
        ...state,
        textInput: payload,
      };
    case SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: payload,
        fileHashes: null,
      };
    case SET_FILE_COMPARING:
      return {
        ...state,
        fileComparing: payload,
      };
    case SET_FILE_COMPARE_HASH:
      return {
        ...state,
        fileCompareHash: payload,
      };
    case SET_FILE_HASH_LOADING:
      return {
        ...state,
        fileHashLoading: payload,
      };
    case SET_TEXT_COMPARING:
      return {
        ...state,
        textComparing: payload,
      };
    case SET_TEXT_COMPARE_HASH:
      return {
        ...state,
        textCompareHash: payload,
      };
    case SET_TEXT_HASH_LOADING:
      return {
        ...state,
        textHashLoading: payload,
      };
    case SET_TEXT_HASH_ERROR:
      return {
        ...state,
        textErrorMessage: payload,
      };
    case SET_FILE_HASH_ERROR:
      return {
        ...state,
        fileErrorMessage: payload,
      };
    default:
      return state;
  }
};

export default CryptoReducer;
