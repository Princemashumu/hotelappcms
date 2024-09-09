const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function setAdminCustomClaims(uid) {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log(`Custom claims set for user ${uid}`);
  } catch (error) {
    console.error('Error setting custom claims:', error);
  }
}

// Replace 'user-uid-here' with the actual UID of the user
setAdminCustomClaims('F07YJ2H0N5SYyp0yvvQj9vDJZQC3');
