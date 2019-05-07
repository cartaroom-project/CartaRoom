const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.setAccType = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;

    admin.auth().setCustomUserClaims(uid,{
        host: data.isHost,
        patron: !data.isHost,
        premium: false,
    }).catch(error => {
            console.log(error);
        });
});

exports.addPatron = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;

    const patronData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        occupation: data.occupation
    };

    const ref = admin.database().ref(`users/patron/${uid}`);
    return ref.set(patronData).catch((error => {
        console.log('ERROR: ${error}')
    }))
});

exports.addHost = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;

    const hostData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        businessName: data.businessName,
        businessAddress: data.businessAddress,
        businessPhone: data.businessPhone,
        businessType: data.businessType
    };

    const ref = admin.database().ref(`users/host/${uid}`);
    return ref.set(hostData).catch((error => {
        console.log('ERROR: ${error}')
    }))
});

exports.addRoom = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;

    console.log('beforetest');
    const roomData = {
        hostID: data.hostID,
        name: data.name,
        capacity: data.capacity,
        description: data.description,
        address: data.address,
        roomID: data.roomID,
        reserved: data.reserved,
        bookingCounter: data.bookingCounter,
        openTime: data.openTime,
        closeTime: data.closeTime,
        amenities: data.amenities,
        bookingSlots: data.bookingSlots
    };

    console.log('afterdata;');
    console.log(roomData);
    const ref = admin.database().ref(`roomtest/${uid}`);
    return ref.set(roomData).catch((error => {
        console.log('ERROR: ${error}')
    }));

});

exports.deleteUserData = functions.auth.user().onDelete((user) => {
});

