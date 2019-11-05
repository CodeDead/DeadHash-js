export const FileDataReader = (file) => {
    return new Promise(resolve => {
        const reader = new FileReader();

        reader.onload = function (event) {
            resolve(event.target.result);
        };

        reader.readAsBinaryString(file);
    });
};