const request = require('request');
const cecula = {};
cecula.apiKey = '';

// Send A2P SMS
cecula.sendA2PSMS = (dataObj, callback) => {
    if (typeof callback !== 'function') {
        console.log('Missing callback argument');
        return null;
    }

    cecula._sendRequest('send/a2p', dataObj).then(result => {
        callback(result);
    });
};

// Send P2P SMS
cecula.sendP2PSMS = (dataObj, callback) => {
    if (typeof callback !== 'function') {
        console.log('Missing callback argument');
        return null;
    }

    cecula._sendRequest('send/p2p', dataObj).then(result => {
        callback(result);
    });
};

// Get A2P SMS Balance
cecula.getA2PBalance = (callback) => {
    if (typeof callback !== 'function') {
        console.log('Missing callback argument');
        return null;
    }

    cecula._sendRequest('account/a2pbalance', {}, 'GET').then(result => {
        callback(result);
    });
};

// Get Sync Cloud Balance
cecula.getSyncCloudBalance = (data, callback) => {
    if (typeof callback !== 'function') {
        console.log('Missing callback argument');
        return null;
    }

    cecula._sendRequest('account/scbalance?identity=' + data.identity, {}, 'GET').then(result => {
        callback(result);
    });
};

// Endpoing for sending HTTP Request
cecula._sendRequest = (endPoint, jsonData, method) => {
    return new Promise(resolve => {
        var options = {};
        if (method === 'GET') {
            options = {
                url: 'https://api.cecula.com/' + endPoint, // cecula url
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + cecula.apiKey
                }
            };
        } else {
            options = {
                url: 'https://api.cecula.com/' + endPoint, // cecula url
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + cecula.apiKey,
                    'cache-control': 'no-cache'
                },
                json: jsonData
            };
        }
        request(options, (error, res, data) => {
            var resultObj = {};
            resultObj = data;
            if (error) {
                resolve(error);
                return;
            }
            // convert the response to an object if it didnt come as an object
            let result = typeof resultObj === 'object' ? resultObj : JSON.parse(resultObj);
            resolve(result);
        });
    });
};

module.exports = cecula;
