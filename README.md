# Cecula SMS
A NodeJS package for Cecula.

[![NPM](https://nodei.co/npm/cecula.png)](https://nodei.co/npm/cecula/)

[![npm version](https://badge.fury.io/js/cecula.svg)](https://badge.fury.io/js/cecula)
[![Build Status](https://travis-ci.org/cecula-sms/node-library.svg?branch=master)](https://travis-ci.org/cecula-sms/node-library)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f7638cf03c6b4adc807d662f2063974a)](https://www.codacy.com/app/godwin-noah/node-library?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cecula-sms/node-library&amp;utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/cecula-sms/node-library/branch/master/graph/badge.svg)](https://codecov.io/gh/cecula-sms/node-library)

## Table of Contents
1.  [Introduction](#introduction)
2.  [How to use the library](#how-to-use-this-library)
3.  [Installation](#installation)
4.  [How to generate an API Key](#how-to-generate-an-api-key)
5.  [Importing cecula Library](#importing-cecula-library)
6.  [Sending A2P SMS](#sending-a2p-sms)
7.  [Sending P2P SMS](#sending-p2p-sms)
8.  [Checking A2P SMS Balance](#checking-a2p-sms-balance)
9.  [Checking Sync Cloud Balance](#checking-sync-cloud-balance)
10. [Error Responses](#error-responses)

## Introduction

Cecula SMS Library enables you to quickly integrate and send A2P and P2P Messages from your application.

## How to use this library
*   Install Cecula SMS from npm or yarn following the instructions in the Installation section or clone from GitHub
*   Login to the <a href="https://developer.cecula.com" target="_blank">Cecula Developers Platform</a> register your app and generate an API KEY
*   Import/Require the library into your script

## Installation
Install with NPM:
```sh
npm i cecula
```
Install with Yarn:
```sh
yarn add cecula
```
Clone from GitHub
```sh
git clone https://github.com/cecula-sms/nodejs-library.git
```
 
## How to generate an API Key
Your API Key is first generated when you register an app. To register an app,
<a href="https://developer.cecula.com" target="_blank">Login to the Developers Dashboard</a>, __Navigate to Apps > Add__, Type the name of your app and click *Submit*. The app will be registered and a new API Key will be generated. Copy the API key into your project

## Importing cecula Library
If you installed the library using npm or yarn, import the library into your script using the code below
```sh
const cecula = require("cecula");
cecula.apiKey = "<API_KEY>"
```
Otherwise, if you cloned the library from GitHub, import the library into your script using the code below
```sh
const cecula = require("./path/to/cecula");
cecula.apiKey = "<API_KEY>"
```

## Sending A2P SMS
To send SMS with alphanumeric identity to single or multiple contacts, use the code below:
```sh
    const messageData = {
        "origin": "LAB",
        "message": "It's a good day to be alive. What are you working on?",
        "recipients": [
            "234809xxxxxxx"
        ]
    }

    cecula.sendA2PSMS(messageData, response => {
        console.log(response)
    })
```
Your response should look like this:
 ```sh
    {
        "status": "sent",
        "reference": "4982953",
        "sentTo": [ "234809xxxxxxx" ],
        "invalid": [],
        "declined": [],
        "declineReason": "234809xxxxxxx",
        "code": "1801"
    }
```
## Sending P2P SMS
To send a message using numberic identity, use the code below:
 ```sh
    const messageData = {
        "origin": "2348050209037",
        "flash": false,
        "message": "Testing the power of many",
        "recipients": [
            "2349090000246",
            "2349090000271"
        ]
    };

    cecula.sendP2PSMS(messageData, reponse => {
        console.log(response);
    });
```
Your response should look like this:
```sh
    {
        "status": "sent",
        "code": "1801",
        "messageID": "2579",
        "sentTo":[
            {
                "recipient": "2349090000246",
                "id": "5990"
            },
            {
                "recipient": "2349090000271",
                "id": "5991"
            }
        ],
        "declined": []
    }
```
## Checking A2P SMS Balance
To get your A2P SMS Balance, __getA2PBalance__ method is used this way:
```sh
    cecula.getA2PBalance(balance => {
        console.log(balance)
    })
```

You should get a response like this:
```sh
    {
        "balance": 234.1
    }
```
## Checking Sync Cloud Balance
To get your Sync Cloud Balance, __getSyncCloudBalance__ method is used this way:
This method requires no parameter:
```sh
    cecula.getSyncCloudBalance(balance=>{
        console.log(balance)
    })
```
You should get a response like this
```sh
    {
        "balance": 9513
    }
```

## Error Responses
In a case where the request fails due to one reason or another you should get an error response from the requested endpoint that looks like this:
```sh
        {
            "error": "Invalid PIN Ref",
            "code": "CE2000"
        }
```
The table below shows a list of error codes and their descriptions:

| Error Code | Description                                                  |
|:----------:| :------------------------------------------------------------|
| CE1001     | Missing Fields                                               |
| CE1002     | Empty Fields                                                 |
| CE1003     | Origin cannot be longer than 11 characters                   |
| CE1004     | A2P Message origin must be alphabets only or alphanumeric    |
| CE1005     | Message cannot be longer than 10 pages                       |
| CE1007     | Cannot find the identity on Sync Cloud                       |
| CE1008     | Origin is pending verification                               |
| CE1009     | Account Unbound. Please Recharge Account and Contact Sales   |
| CE1010     | Numeric Originator must be between 5 - 16 digits long        |
| CE1011     | P2P Message originator must be numeric                       |
| CE1012     | Origin is not verified                                       |
| CE1013     | Sync App is Offline. Please check device                     |
