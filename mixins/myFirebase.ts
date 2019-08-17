import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyASLzAbZVdYZBrdjJIPz0S0V84WlgWRlOQ",
  authDomain: "portfolio-35f3d.firebaseapp.com",
  databaseURL: "https://portfolio-35f3d.firebaseio.com",
  projectId: "portfolio-35f3d",
  storageBucket: "",
  messagingSenderId: "478572399146",
  appId: "1:478572399146:web:f137f73a51472741"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
