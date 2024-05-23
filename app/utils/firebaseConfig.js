// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOTJyxgTQpnL0njAA1E0vQn90Tl0cwMuA",
  authDomain: "iot-cup-91e1e.firebaseapp.com",
  databaseURL: "https://iot-cup-91e1e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-cup-91e1e",
  storageBucket: "iot-cup-91e1e.appspot.com",
  messagingSenderId: "292951109469",
  appId: "1:292951109469:web:b8a724bf9d1107fa9f02b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db};
