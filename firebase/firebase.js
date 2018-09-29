import firebase from "firebase/app";
import "firebase/auth";

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

export { auth };
