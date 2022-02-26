import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	GeoPoint,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "***REMOVED***",
	authDomain: "leamap-d7b0e.firebaseapp.com",
	projectId: "leamap-d7b0e",
	storageBucket: "leamap-d7b0e.appspot.com",
	messagingSenderId: "152787458052",
	appId: "1:152787458052:web:3556c386d3ec22507afd51",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const login = async (email, pwd) => {
	await signInWithEmailAndPassword(auth, email, pwd)
		.then((userCredential) => {
			localStorage.setItem("currentUser", JSON.stringify(userCredential.user));
		})
		.catch((err) => {
			console.error(err);
		});
};

const register = async (name, email, pwd) => {
	await createUserWithEmailAndPassword(auth, email, pwd)
		.then(async (res) => {
			const user = res.user;
			await setDoc(doc(db, "users", user.uid), {
				name, // name: name
			});
			localStorage.setItem("currentUser", JSON.stringify(user));
		})
		.catch((err) => {
			console.error(err);
		});
};

const getNom = async (user) => {
	return new Promise((resolve) => {
		getDoc(doc(db, "users", user.uid)).then((snap) => {
			resolve(snap.data().name);
		});
	});
};

const logout = async () => {
	await signOut(auth).then(() => {
		localStorage.removeItem("currentUser");
	});
};

const loggedIn = () => {
	return JSON.parse(localStorage.getItem("currentUser"));
};

export { login, register, getNom, logout, loggedIn, GeoPoint };
