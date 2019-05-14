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

    const ref = admin.database().ref(`users/patron/${uid}`);
    return ref.set(data).catch((error => {
        console.log(`ERROR: ${uid}`)
    }))
});

exports.addHost = functions.https.onCall((data, context) => {
    const uid = context.auth.uid;

    const ref = admin.database().ref(`users/host/${uid}`);
    return ref.set(data).catch((error => {
        console.log(`ERROR: ${uid}`)
    }))
});

exports.addRoom = functions.https.onCall((data, context) => {
    console.log(data);
    const ref = admin.database().ref(`rooms/`);
    var newRoomID = ref.push(data).key
    console.log(`key: ${newRoomID}`)

    admin.database().ref(`rooms/${newRoomID}`).update({
        roomID:newRoomID
    })
});

exports.createRoom = functions.https.onCall((data, context) => {
    console.log(data)

    return admin.database().ref('rooms/' + data).once('value').then((snapshot) => {
        data.roomInfo = snapshot.val()
    }).then(()=>{
        return{roomInfo:data.roomInfo}
    })
});


exports.updateRoom = functions.https.onCall((data, context) => {
    var roomID = data.roomID;
    console.log('roomID:' + roomID)
    console.log('data1: ' + data);
    admin.database().ref(`rooms/${roomID}`).update(data)
});

exports.hostBooking = functions.https.onCall((data, context) => {
    const userID = context.auth.uid;

    return admin.database().ref('currentBookings').orderByChild("room/hostID").
    equalTo(userID).once('value').then((snapshot) => {
        data.bookings = [];
        snapshot.forEach((doc) => {
            data.bookings.push(doc.val());
        });
        console.log(data.booking)
    }).then(() => {
        return { bookings: data.bookings };
    }).catch((error) => {
        console.log(error);
    });
});

exports.booking = functions.https.onCall((data, context) => {
    const userID = context.auth.uid;

    return admin.database().ref('currentBookings').orderByChild("room/hostID").
    equalTo(userID).once('value').then((snapshot) => {
        data.bookings = [];
        snapshot.forEach((doc) => {
            data.bookings.push(doc.val());
        });
        console.log(data.booking);
    }).then(() => {
        return { bookings: data.bookings };
    }).catch((error) => {
        console.log(error);
    });
});

exports.patronBooking = functions.https.onCall((data, context) => {
    const userID = context.auth.uid;

    return admin.database().ref('currentBookings').orderByChild("user").
    equalTo(userID).once('value').then((snapshot) => {
        data.bookings = [];
        snapshot.forEach((doc) => {
            data.bookings.push(doc.val());
        })
    }).then(() => {
        return { bookings: data.bookings };
    }).catch((error) => {
        console.log(error);
    });
});

exports.hostDeleteRoom = functions.https.onCall((data, context) => {
    admin.database().ref('rooms').child(data.id).remove();
});

exports.createRoom =functions.https.onCall((data, context) => {
    return admin.database().ref('rooms/' + data.id).once('value').then((snapshot) => {
        data.roomInfo = snapshot.val();
    }).then(() => {
        return { roomInfo: data.roomInfo };
    }).catch((error) => {
        console.log(error);
    });
});

exports.bookingStatus = functions.https.onCall((data, context) =>  {
    admin.database().ref('allBookings').orderByChild("initialBookingID").
    equalTo(data.bookingID).once('value').then((snapshot) => {
        snapshot.forEach((doc) => {
            admin.database().ref('allBookings').child(doc.key).update({status: data.statMsg});
        })

        if(data.statMsg == "completed")
        {
            admin.database().ref('rooms/' + data.roomID).once('value').then((snapshot) => {
                admin.database().ref('rooms/' + data.roomID).update({
                    bookingCounter: ++snapshot.val().bookingCounter
                })
            });
        }
    });

    admin.database().ref('currentBookings').child(data.bookingID).remove();
});

exports.roomViewPatronCreated =functions.https.onCall((data, context) => {
    return admin.database().ref('users/patron/' + context.auth.uid).once('value').then((snapshot) => {
        data.userEmail = snapshot.val().email
    }).then(() => {
        return { userEmail: data.userEmail };
    }).catch((error) => {
        console.log(error);
    });
});

exports.checkBookingExist =functions.https.onCall((data, context) => {

    return  admin.database().ref('currentBookings').orderByChild("bookingInfo").equalTo(data.bookingInfo).once('value').then((snapshot) => {
        if (snapshot.exists())
        {
            data.snapshotExist = true;
        } else {
            data.snapshotExist = false;
        }
    }).then(() => {
        return {
            snapshotExist: data.snapshotExist
        };
    }).catch((error) => {
        console.log(error);
    });
});

exports.getHostNameRoomViewPatron =functions.https.onCall((data, context) => {

    return  admin.database().ref('users/host/' + data.hostID).once('value').then((snapshot) => {
        data.hostName = snapshot.val().businessName;
        console.log('host: ' + data.hostName);
    }).then(() => {
        return {
            hostName: data.hostName
        };
    }).catch((error) => {
        console.log(error);
    });
});

exports.updateUIDBookingViewRoomPatron =functions.https.onCall((data, context) => {
    data.uniqueKeyIDBooking = admin.database().ref('currentBookings').push(data.info);

    return admin.database().ref('currentBookings/' + data.uniqueKeyIDBooking.key).update({
        bookingID: data.uniqueKeyIDBooking.key
    }).then(() => {
        return {
            uniqueKeyIDBooking: data.uniqueKeyIDBooking.key
        };
    }).catch((error) => {
        console.log(error);
    });
});

exports.updateUIDAllBookingViewRoomPatron =functions.https.onCall((data, context) => {

    console.log(data);
    const uniqueKeyIDBooking = admin.database().ref('allBookings').push(data);
    console.log("uniqueKeyIDBooking: " + uniqueKeyIDBooking);
    admin.database().ref('allBookings/' + uniqueKeyIDBooking.key).update({
        allbookingID: uniqueKeyIDBooking.key
    })
});

// {
//     "rules": {
//     "users": {
//         ".read": true,
//             ".write": true
//     },
//     "rooms": {
//         ".read": true,
//             ".write": true
//     },
//     "currentBookings": {
//         ".read": true,
//             ".write": true
//     },
//     "allBookings": {
//         ".read": true,
//             ".write": true
//     },
//       "roomtest": {
//         ".read": true,
//             ".write": true
//     }
// }
// }
