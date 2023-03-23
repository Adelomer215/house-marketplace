import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf3EJZT0xgpr9wtOC5rePqIYw0WmfkglM",
  authDomain: "house-marketplace-e8a1b.firebaseapp.com",
  projectId: "house-marketplace-e8a1b",
  storageBucket: "house-marketplace-e8a1b.appspot.com",
  messagingSenderId: "355156722504",
  appId: "1:355156722504:web:2cca0b2fa210c01364297d",
  measurementId: "G-Y5PB4KLBFV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
