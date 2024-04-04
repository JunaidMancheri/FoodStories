const admin = require('firebase-admin');

const serviceAccount = require('../service-accounts/firebaseServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const predefinedEmail = process.env['email'];
const predefinedPassword = process.env['password'];

if (!predefinedEmail || !predefinedPassword) {
  throw new Error('provide email and password  in environment');
}

admin.auth().createUser({
  email: predefinedEmail,
  password: predefinedPassword,
})
  .then((userRecord) => {
    console.log('Successfully created new user:', userRecord.uid);
    return admin.auth().setCustomUserClaims(userRecord.uid, { admin: true });
  })
  .then(() => {
    console.log('User is now an admin');
  })
  .catch((error) => {
    console.error('Error creating user:', error);
  });
