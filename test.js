const myCecula = require("./cecula");
myCecula.apiKey = "CCL.BxqLKqVCwHmT-IE.K4JkqE6DDnn3T4tTc4qCQa3M"

const messageObject = {
    message: "hello world",
    origin: "LAB",
    recipients: [
        "2348183172770"
    ]
}

myCecula.sendA2PSMS(messageObject, console.log);