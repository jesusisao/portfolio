import * as admin from 'firebase-admin';
const serviceAccount = require("./portfolio-35f3d-24b3426b4864.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://portfolio-35f3d.firebaseio.com"
});

export default admin
