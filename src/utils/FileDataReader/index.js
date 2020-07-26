import CryptoJS from "crypto-js";

const FileDataReader = (file, md5, sha1, sha224, sha256, sha3, sha384, sha512, ripemd160) => {

    const MD5 = CryptoJS.algo.MD5.create();
    const SHA1 = CryptoJS.algo.SHA1.create();
    const SHA224 = CryptoJS.algo.SHA224.create();
    const SHA256 = CryptoJS.algo.SHA256.create();
    const SHA3 = CryptoJS.algo.SHA3.create();
    const SHA384 = CryptoJS.algo.SHA384.create();
    const SHA512 = CryptoJS.algo.SHA512.create();
    const RIPEMD160 = CryptoJS.algo.RIPEMD160.create();

    return new Promise((resolve, reject) => {
        const chunkSize = 1024 * 1024;

        let offset = 0;
        let partial;
        let index = 0;

        if (file.size === 0) {
            resolve(null);
        }

        while (offset < file.size) {
            partial = file.slice(offset, offset + chunkSize);

            const reader = new FileReader();

            reader.size = chunkSize;
            reader.offset = offset;
            reader.index = index;

            reader.onload = (evt) => {
                const wordBuffer = CryptoJS.lib.WordArray.create(evt.target.result);

                if (md5) MD5.update(wordBuffer);
                if (sha1) SHA1.update(wordBuffer);
                if (sha224) SHA224.update(wordBuffer);
                if (sha256) SHA256.update(wordBuffer);
                if (sha3) SHA3.update(wordBuffer);
                if (sha384) SHA384.update(wordBuffer);
                if (sha512) SHA512.update(wordBuffer);
                if (ripemd160) RIPEMD160.update(wordBuffer);

                if (reader.offset + reader.size >= file.size) {
                    const newHashes = [];

                    if (md5) newHashes.push({type: "MD5", hash: MD5.finalize().toString()});
                    if (sha1) newHashes.push({type: "SHA-1", hash: SHA1.finalize().toString()});
                    if (sha224) newHashes.push({type: "SHA-224", hash: SHA224.finalize().toString()});
                    if (sha256) newHashes.push({type: "SHA-256", hash: SHA256.finalize().toString()});
                    if (sha3) newHashes.push({type: "SHA-3", hash: SHA3.finalize().toString()});
                    if (sha384) newHashes.push({type: "SHA-384", hash: SHA384.finalize().toString()});
                    if (sha512) newHashes.push({type: "SHA-512", hash: SHA512.finalize().toString()});
                    if (ripemd160) newHashes.push({type: "RIPEMD-160", hash: RIPEMD160.finalize().toString()});

                    if (newHashes.length === 0) resolve(null);
                    else resolve(newHashes);
                }
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(partial);

            offset += chunkSize;
            index += 1;
        }
    });
};

export default FileDataReader;
