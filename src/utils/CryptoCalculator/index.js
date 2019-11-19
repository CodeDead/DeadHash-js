import CryptoMd5 from "crypto-js/md5";
import CryptoSha1 from "crypto-js/sha1";
import CryptoSha224 from "crypto-js/sha224";
import CryptoSha256 from "crypto-js/sha256";
import CryptoSha3 from "crypto-js/sha3";
import CryptoSha384 from "crypto-js/sha384";
import CryptoSha512 from "crypto-js/sha512";
import CryptoRipemd160 from "crypto-js/ripemd160";

export const CryptoCalculator = (input, md5, sha1, sha224, sha256, sha3, sha384, sha512, ripemd160) => {
    const newHashes = [];

    if (md5) {
        newHashes.push({type: "MD5", hash: CryptoMd5(input).toString()});
    }
    if (sha1) {
        newHashes.push({type: "SHA-1", hash: CryptoSha1(input).toString()});
    }
    if (sha224) {
        newHashes.push({type: "SHA-224", hash: CryptoSha224(input).toString()});
    }
    if (sha256) {
        newHashes.push({type: "SHA-256", hash: CryptoSha256(input).toString()});
    }
    if (sha3) {
        newHashes.push({type: "SHA-3", hash: CryptoSha3(input).toString()});
    }
    if (sha384) {
        newHashes.push({type: "SHA-384", hash: CryptoSha384(input).toString()});
    }
    if (sha512) {
        newHashes.push({type: "SHA-512", hash: CryptoSha512(input).toString()});
    }
    if (ripemd160) {
        newHashes.push({type: "RIPEMD-160", hash: CryptoRipemd160(input).toString()});
    }

    return newHashes;
};