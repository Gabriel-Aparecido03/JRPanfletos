import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAY-tlQph2c7BTTrhNiXrhb6J7YhanGoPw",
  authDomain: "jrpanfletos-9ddee.firebaseapp.com",
  projectId: "jrpanfletos-9ddee",
  storageBucket: "jrpanfletos-9ddee.appspot.com",
  messagingSenderId: "520595995050",
  appId: "1:520595995050:web:bcf5aefa7f3788a5f613d3"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)