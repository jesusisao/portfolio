import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASLzAbZVdYZBrdjJIPz0S0V84WlgWRlOQ",
  authDomain: "portfolio-35f3d.firebaseapp.com",
  databaseURL: "https://portfolio-35f3d.firebaseio.com",
  projectId: "portfolio-35f3d",
  storageBucket: "",
  messagingSenderId: "478572399146",
  appId: "1:478572399146:web:f137f73a51472741"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export const getIdToken = async () => {
  const currentUser = await firebase.auth().currentUser;
  if (currentUser === null) {
    throw Error("ログインしていません。")
  }
  return await currentUser.getIdToken(/* forceRefresh */ true);
};

export default firebase;
