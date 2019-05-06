//import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from CartaRoom!");
// });

// export const getUsers = functions.https.onRequest((request, response) => {
//  const promise = admin.firestore().doc('users/LdHQQ0s3Al0H-cD5sqj').get()
//  const p2 = promise.then(snapshot => {
//   const data = snapshot.data()
//   response.send(data)
//  })
//
//  p2.catch(error => {
//   console.log(error)
//   response.status(500).send(error)
//  })
//
//  response.send("trying to access database from the bottom")
// });

// export const getUser = functions.https.onRequest((request, response) =>
// {
//  const db = admin.database().ref('users/{userId}/email')
//
//  const ref = admin.database().ref()
//  ref.on('value', function(snapshot)
//  {
//
//  })
//  // response.send("test")
//  //
//  // admin.database().ref('users/${userid}/email').once('value').then(result=>
//  // {
//  //  console.log('result: ')
//  //  console.log(result.val())
//  // }).catch(error=>{
//  //  response.status(500).status(error)
//  // })
// });



