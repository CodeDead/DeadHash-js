import React, { createContext, useReducer } from 'react';
import CryptoReducer from '../../reducers/CryptoReducer';

const md4 = localStorage.md4 && localStorage.md4 === 'true' ? true : !localStorage.md4;
const md5 = localStorage.md5 && localStorage.md5 === 'true' ? true : !localStorage.md5;
const sha1 = localStorage.sha1 && localStorage.sha1 === 'true' ? true : !localStorage.sha1;
const sha224 = localStorage.sha224 && localStorage.sha224 === 'true' ? true : !localStorage.sha224;
const sha256 = localStorage.sha256 && localStorage.sha256 === 'true' ? true : !localStorage.sha256;
const sha384 = localStorage.sha384 && localStorage.sha384 === 'true' ? true : !localStorage.sha384;
const sha512 = localStorage.sha512 && localStorage.sha512 === 'true' ? true : !localStorage.sha512;
const ripemd160 = localStorage.ripemd160 && localStorage.ripemd160 === 'true' ? true : !localStorage.ripemd160;
const crc32 = localStorage.crc32 && localStorage.crc32 === 'true' ? true : !localStorage.crc32;

const initState = {
  md4,
  md5,
  sha1,
  sha224,
  sha256,
  sha384,
  sha512,
  ripemd160,
  crc32,
  fileHashes: null,
  textHashes: null,
  textInput: '',
  currentFile: null,
  fileComparing: false,
  fileCompareHash: '',
  fileHashLoading: false,
  textComparing: false,
  textCompareHash: '',
  textHashLoading: false,
  textErrorMessage: null,
  fileErrorMessage: null,
};

export const CryptoContext = createContext(initState);

const CryptoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CryptoReducer, initState);

  return (
    <CryptoContext.Provider value={[state, dispatch]}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoContextProvider;
