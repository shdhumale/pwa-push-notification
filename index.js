//import express
const express = require("express");
//import web-push
const webpush = require("web-push");
//import body-parser
const bodyParser = require("body-parser");
//import path
const path = require("path");
//Create express instance.
const app = express();
// Load client using static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

//You can create below given client public and privet key using following command
// .\node_modules\.bin\web-push generate-vapid-keys
const publicVapidKey =
    "BEoeY3tcr02aVTEq8Fpzt8ghlMIhivCut-bg2bApj24V-bwsXcP8mSdUMCyrvF4Ff0oohQ0vZRb7Lyv2gfOF-HY";
const privateVapidKey = "l-I0vSJR8ECZT4QNPbhBzS7dRek64ZKiJltQSd8WMqQ";

//Setting the details that will be required by the webpush api. You can get this code from https://github.com/web-push-libs/web-push
webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

// Subscribe Route :- This will be used to send the subscribe request from the client to service worker
app.post("/subscribe", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;

    // Send 201 - resource created :- Then we send back the status 201 that indicate the resource is created successfully in the nodejs server for the subscription request made by the client.
    res.status(201).json({});

    // Create payload:- that we used to send it to the client that will be shown to the end user.
    const payload = JSON.stringify({ title: "Push Test" });

    // Pass object into sendNotification :- In this step we will send this subscription and payload to the client using web.pushSendNotification
    webpush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
});

const port = 5000;

app.listen(port, () => console.log(`Node Server started on port ${port}`));
