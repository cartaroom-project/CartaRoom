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

exports.deleteUserData = functions.auth.user().onDelete((user) => {
});

<<<<<<< HEAD
exports.HostFormFunction = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;
    const hostInfo = {
        ispremium:          data.ispremium,
        fullName:           data.fullName,
        businessAddress:    data.businessAddress,
        email:              data.email,
        phoneNumber:        data.phoneNumber,
    }
    
    console.log("entered into host cloud function")
    const ref = admin.database().ref(`users/hostInfo/${uid}`);
    return ref.set(hostInfo)
        .catch((error) => {
            console.log(`Error: ${error}`)
        });
});
=======
>>>>>>> 3e8330b534d59eeb678e9858c7905bfed7a4e66d
