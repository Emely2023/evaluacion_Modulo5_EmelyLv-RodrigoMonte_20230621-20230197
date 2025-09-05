// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import {
  APIKEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
} from "@env";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("Valor de configuracion", firebaseConfig);

if (app) {
  console.log("Firebase initialized successfully");
} else {
  console.log("Firebase initialization failed");
}

const database = getFirestore(app);
if (database) {
  console.log("Firestore initialized correctly");
} else {
  console.log("Firestore initialization failed");
}

const storage = getStorage(app);

if (storage) {
  console.log("storage initialized correctly");
} else {
  console.log("storage initialization failed");
}

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
if (auth) {
  console.log("auth initialized correctly");
} else {
  console.log("auth initialization failed");
}

export { database, storage, auth };
