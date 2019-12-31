import axios from "axios";

export const Updater = (os) => {

    const parseUpdate = (update) => {

        const platform = update.platforms[os.platform];
        const data = {
            updateUrl: false,
            downloadUrl: null,
            infoUrl: null,
            version: null
        };

        if (platform.version.majorVersion > 2)
            data.updateAvailable = true;
        else if (platform.version.minorVersion > 0)
            data.updateAvailable = true;
        else if (platform.version.buildVersion > 0)
            data.updateAvailable = true;
        else if (platform.version.revisionVersion > 0)
            data.updateAvailable = true;

        data.updateUrl = platform.updateUrl;
        data.infoUrl = platform.infoUrl;
        data.version = platform.version.majorVersion + "." + platform.version.minorVersion + "." + platform.version.buildVersion + "." + platform.version.revisionVersion;

        return data;
    };

    return new Promise(resolve => {
        axios.get("https://codedead.com/Software/DeadHash/version.json")
            .then(res => {
                resolve(parseUpdate(res.data));
            })
            .catch(err => {
                resolve(err.message);
            })
    });
};
