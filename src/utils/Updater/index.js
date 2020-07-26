const Updater = (os) => {

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
        else if (platform.version.buildVersion > 4)
            data.updateAvailable = true;
        else if (platform.version.revisionVersion > 0)
            data.updateAvailable = true;

        data.updateUrl = platform.updateUrl;
        data.infoUrl = platform.infoUrl;
        data.version = platform.version.majorVersion + "." + platform.version.minorVersion + "." + platform.version.buildVersion + "." + platform.version.revisionVersion;

        return data;
    };

    return new Promise((resolve, reject) => {
        fetch("https://codedead.com/Software/DeadHash/version.json")
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json();
            })
            .then(data => {
                resolve(parseUpdate(data));
            })
            .catch(error => {
                reject(error.toString());
            });
    });
};

export default Updater;
