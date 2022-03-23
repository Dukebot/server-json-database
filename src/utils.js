const fs = require('fs');
const resolve = require('path').resolve;

const Utils = {

    createJson(path, obj) {
        fs.writeFileSync(path, JSON.stringify(obj, null, 2));
    },

    fileExists(path) {
        console.log("path = " + path);
        let file_exists = false;
        try {
            if (fs.existsSync(path)) {
                file_exists = true;
            }
        } catch (err) {
            console.error(err)
        }
        return file_exists;
    }
};

module.exports = Utils;

