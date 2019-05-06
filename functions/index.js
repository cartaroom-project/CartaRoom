const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createUserData = functions.auth.user().onCreate((user) => {
    let uid = user.uid;
    return createUserInfo(user)
});


function createUserInfo(user) {
    const userInfo = {
        email: user.email
    }

    const ref = admin.database().ref(`users/${user.uid}`);

    return ref.set(userInfo)
        .catch((error) => {
            console.log(`Error: ${error}`)
        });
}

exports.SetAccType = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;

    admin.auth().setCustomUserClaims(uid,{
        host: data.isHost,
        patron: !data.isHost,
        premium: false,
    })
        .then(() => {
            // Update real-time database to notify client to force refresh.
            const metadataRef = admin.database().ref("metadata/" + user.uid);

            // Set the refresh time to the current UTC timestamp.
            // This will be captured on the client to force a token refresh.
            return metadataRef.set({ refreshTime: new Date().getTime() });
        })
        .catch(error => {
            console.log(error);
        });

});

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
