import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// nodejs library to set properties for components
import PropTypes from "prop-types";

const devConfig = {
  apiKey: "AIzaSyDtZLZMjy5KmC3qaOVpKhDUmlBRg5OmcO8",
  authDomain: "urban-shelter-dev.firebaseapp.com",
  databaseURL: "https://urban-shelter-dev.firebaseio.com",
  projectId: "urban-shelter-dev",
  storageBucket: "urban-shelter-dev.appspot.com",
  messagingSenderId: "848777771838"
};

const prodConfig = {
  apiKey: "AIzaSyAFXyFYXZ0dEI7UNU6Gav3b8gEZmsimH68",
  authDomain: "urban-shelter.firebaseapp.com",
  databaseURL: "https://urban-shelter.firebaseio.com",
  projectId: "urban-shelter",
  storageBucket: "urban-shelter.appspot.com",
  messagingSenderId: "215249928407"
};

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

const location = (latitude, longitude) => {
  return typeof latitude && typeof longitude === "number"
    ? new firebase.firestore.GeoPoint(latitude, longitude)
    : null;
};

export { auth, db, location, googleProvider, facebookProvider };

location.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number
};
