
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
const assert = require('chai').assert;
const cecula = require('../cecula');

// Sandbox API Key
const sandboxApiKey = 'CCL.7F9S1OWgCO4O-QB.5z5CuTFgNzjldhI8TQO2IQRF';

const messageObject = {
    origin: 'CECULA',
    message: 'In the lab',
    recipients: [
        '2349090000246'
    ]
};

describe('A2P SMS', () => {
    it('Verifying that API Key property is defined in cecula object', function () {
        assert.exists(cecula.apiKey, 'API Key exists');
    });

    it('API Request made without API Key returns object with code and error property', function () {
        cecula.getA2PBalance(data => {
            assert.hasAllKeys(data, ['code', 'error']);
        });
    });

    it('Cecula returns 401 when API key is not submitted', function () {
        cecula.getA2PBalance(data => {
            assert.equal(data.code, 401);
        });
    });

    // Test with Sandbox API Key
    it('API Key is 44 characters long', function () {
        assert.lengthOf(sandboxApiKey, 44);
    });

    it('Balance property is returned when correct API Key is provided', function () {
        cecula.apiKey = sandboxApiKey;
        cecula.getA2PBalance(data => {
            assert.hasAllKeys(data, ['balance']);
        });
    });

    it('Missing fields during A2P Message sending returns error object', function () {
        cecula.apiKey = sandboxApiKey;
        cecula.sendA2PSMS({}, data => {
            assert.hasAllKeys(data, ['error', 'code']);
        });
    });

    it('Missing fields during A2P Message sending returns error code CE1001', function () {
        cecula.apiKey = sandboxApiKey;
        cecula.sendA2PSMS({}, data => {
            assert.equal(data.code, 'CE1001');
        });
    });

    it('Empty fields during A2P Message sending returns error code CE1002', function () {
        cecula.apiKey = sandboxApiKey;
        cecula.sendA2PSMS({
            origin: '',
            message: '',
            recipients: []
        }, data => {
            assert.equal(data.code, 'CE1002');
        });
    });

    it('Sender Names longer than 11 characters return CE1003', function () {
        cecula.apiKey = sandboxApiKey;
        let tooLongOriginMsg = messageObject;
        tooLongOriginMsg.origin = 'CECULA ALCHEMY';
        cecula.sendA2PSMS(tooLongOriginMsg, data => {
            assert.equal(data.code, 'CE1003');
        });
    });

    it('A2P SMS Sender Names must be alphabets or alphanumeric else return CE1004', function () {
        cecula.apiKey = sandboxApiKey;
        let tooLongOriginMsg = messageObject;
        tooLongOriginMsg.origin = '19827634';
        cecula.sendA2PSMS(tooLongOriginMsg, data => {
            assert.equal(data.code, 'CE1004');
        });
    });

    it('A2P SMS message cannot exceed 10 pages', function () {
        let letters = 'abcdefghijklmnopqrstuvwxyz ';
        let message = '';
        const letterLength = letters.length;
        do {
            message += letters.charAt(Math.random() * letterLength);
        } while (message.length < 1531);

        cecula.apiKey = sandboxApiKey;
        let tooLongOriginMsg = messageObject;
        tooLongOriginMsg.message = message;
        cecula.sendA2PSMS(tooLongOriginMsg, data => {
            assert.equal(data.code, 'CE1005');
        });
    });

    it('A2P SMS message is successfully sent', function () {
        cecula.apiKey = sandboxApiKey;
        messageObject.origin = 'LAB';
        messageObject.message = 'Hello World';
        cecula.sendA2PSMS(messageObject, data => {
            assert.hasAllKeys(data, ['status', 'reference', 'sentTo', 'invalid', 'declined', 'declineReason', 'code']);
        });
    });
});
