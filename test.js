const myCecula = require('./cecula');
myCecula.apiKey = 'CCL.BxqLKqVCwHmT-IE.K4JkqE6DDnn3T4tTc4qCQa3M';

const messageObject = {
    message: 'hello world',
    origin: 'LAB',
    recipients: [
        '2348183172770'
    ]
};

const lr = myCecula.sendA2PSMSAsync(messageObject);
console.log(lr)
;
