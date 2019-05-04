const request = require("request");
const cecula = {};
cecula.apiKey = "";

// Send A2P SMS
cecula.sendA2PSMS = (dataObj, callback) => {
    if (typeof callback !== "function") {
        console.info("Missing callback argument");
        return null;
    }

    cecula._sendRequest("send/a2p", dataObj, "POST").then((result) => {
        callback(result);
    });
};

// Send P2P SMS
cecula.sendP2PSMS = (dataObj, callback) => {
    if (typeof callback !== "function") {
        console.info("Missing callback argument");
        return null;
    }

    cecula._sendRequest("send/p2p", dataObj, "POST").then((result) => {
        callback(result);
    });
};

// Get A2P SMS Balance
cecula.getA2PBalance = (callback) => {
    if (typeof callback !== "function") {
        console.info("Missing callback argument");
        return null;
    }

    cecula._sendRequest("account/a2pbalance", {}, "GET").then((result) => {
        callback(result);
    });
};

// Get Sync Cloud Balance
cecula.getSyncCloudBalance = (data, callback) => {
    if (typeof callback !== "function") {
        console.info("Missing callback argument");
        return null;
    }

    cecula._sendRequest("account/scbalance?identity=" + data.identity, {}, "GET").then((result) => {
        callback(result);
    });
};

// Endpoing for sending HTTP Request
cecula._sendRequest = (endPoint, jsonData, method, timeout = 36000) => {
    return new Promise((resolve, reject) => {
        var options = {
            "url": "https://api.cecula.com/" + endPoint, // cecula url
            "method": method,
            "headers": {
                "Authorization": "Bearer " + cecula.apiKey,
                "cache-control": "no-cache"
            },
            "timeout": timeout
        };

        if (["POST", "PUT", "OPTIONS", "PATCH"].indexOf(method) > -1) {
            options.headers.Accept = "application/json";
            options.headers["Content-Type"] = "application/json";
            options.json = jsonData;
        }

        request(options, (error, res, data) => {
            if (error) {
                resolve(error);
                return;
            }
            // convert the response to an object if it didnt come as an object
            let result = typeof data === "object" ? data : JSON.parse(data);
            resolve(result);
        });
    });
};

module.exports = cecula;
