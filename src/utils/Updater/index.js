import axios from "axios";

export const Updater = () => {
    return new Promise(resolve => {
        axios.get("https://codedead.com/Software/DeadHash/version.json")
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                resolve(err.message);
            })
    });
};
