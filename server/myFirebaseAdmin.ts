import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.MY_FIREBASE_PROJECT_ID,
    clientEmail: process.env.MY_FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.MY_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n')
  }),
  databaseURL: "https://portfolio-35f3d.firebaseio.com"
});

export default admin
