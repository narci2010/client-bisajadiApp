const functions = require('firebase-functions');
const jawaban = require('./db')
const cors = require('cors')({origin: true})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

function acak() {
  let random = Math.floor(Math.random() * jawaban.length)
  return random
}

exports.helloWorld = functions.https.onRequest((request, response) => {
  let result = acak() 
  console.log(result)
  response.send(jawaban[result]);
});
