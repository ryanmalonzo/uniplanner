import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA-QzwHQoJyMn86RRlXCPUYTFQcsZJ3bsk",
  authDomain: "leamap-d7b0e.firebaseapp.com",
  projectId: "leamap-d7b0e",
  storageBucket: "leamap-d7b0e.appspot.com",
  messagingSenderId: "152787458052",
  appId: "1:152787458052:web:3556c386d3ec22507afd51",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      console.error(error);
    });
};

export const register = async (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      const user = res.user;
    })
    .catch((error) => {
      console.error(error);
    });
};
