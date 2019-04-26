const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
 });

 exports.addUser = functions.https.onRequest((request, response) => {
    if (request.method !== "POST") {
        response.status(400).send("what are you trying baby?");
        return 0;
    }

    const email = request.body.email;
    const pass = request.body.password; 

        firebase.auth().createUserWithEmailAndPassword(email,pass);
        firebase.database().ref('users').push({email: email, edit: false});
        response.send("You have successfully signed up!");
   });
