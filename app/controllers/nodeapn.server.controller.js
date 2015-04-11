'use strict';

/**
 * Created by whn13 on 15/4/11.
 */
var apn = require ('apn');

//var tokens = ['<insert token here>', '<insert token here>'];

//if(tokens[0] === '<insert token here>') {
//    console.log('Please set token to a valid device token for the push notification service');
//    process.exit();
//}

// Create a connection to the service using mostly default parameters.

function errorHappened(err, notification){
    console.log('err ' + err);
}

var options = {
    cert: 'public/certifications/cert.pem',                 /* Certificate file path */
    key:  'public/certifications/key.pem',                  /* Key file path */
    gateway: 'gateway.sandbox.push.apple.com',/* gateway address */
    port: 2195,                       /* gateway port */
    errorCallback: errorHappened ,    /* Callback when error occurs function(err,notification) */
    production: false
};

var service = new apn.connection(options);

service.on('connected', function() {
    console.log('Connected');
});

service.on('transmitted', function(notification, device) {
    console.log('Notification transmitted to:' + device.token.toString('hex'));
});

service.on('transmissionError', function(errCode, notification, device) {
    console.error('Notification caused error: ' + errCode + ' for device ', device, notification);
    if (errCode === 8) {
        console.log('A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox');
    }
});

service.on('timeout', function () {
    console.log('Connection Timeout');
});

service.on('disconnected', function() {
    console.log('Disconnected from APNS');
});

service.on('socketError', console.error);


// If you plan on sending identical paylods to many devices you can do something like this.
function pushNotificationToMany(tokens) {
    console.log('Sending the same notification each of the devices with one call to pushNotification.');
    var note = new apn.notification();
    note.setAlertText('Hello, from node-apn!');
    note.badge = 1;

    service.pushNotification(note, tokens);
}

//pushNotificationToMany();


// If you have a list of devices for which you want to send a customised notification you can create one and send it to and individual device.
function pushSomeNotifications(tokens) {
    console.log('Sending a tailored notification to %d devices', tokens.length);
    tokens.forEach(function(token, i) {
        var note = new apn.notification();
        note.setAlertText('Hello, from node-apn! You are number: ' + i);
        note.badge = i;

        service.pushNotification(note, token);
    });
}

//pushSomeNotifications();

exports.pushOneNotification  = function(token) {
    console.log('Sending a tailored notification to 1 devices');
    var note = new apn.notification();
    note.setAlertText('Hello, from node-apn!');
    note.badge = 0;
    service.pushNotification(note, token);
};
