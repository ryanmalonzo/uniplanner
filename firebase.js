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
	addDoc,
	setDoc,
	getDoc,
	getDocs,
	collection,
	query,
	where,
	deleteDoc,
	GeoPoint,
	enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js";

import { API_KEY } from "./config.js";

const firebaseConfig = {
	apiKey: API_KEY.FIREBASE,
	authDomain: "leamap-d7b0e.firebaseapp.com",
	projectId: "leamap-d7b0e",
	storageBucket: "leamap-d7b0e.appspot.com",
	messagingSenderId: "152787458052",
	appId: "1:152787458052:web:3556c386d3ec22507afd51",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

enableIndexedDbPersistence(db).catch((err) => console.error(err));

let username = localStorage.getItem("username");

const getNom = async (user) => {
	return new Promise((resolve) => {
		getDoc(doc(db, "users", user.uid)).then((snap) => {
			resolve(snap.data().name);
		});
	});
};

const login = async (email, pwd) => {
	await signInWithEmailAndPassword(auth, email, pwd).then(async (res) => {
		const username = await getNom(res.user);
		localStorage.setItem("username", username);
	});
};

const register = async (name, email, pwd) => {
	await createUserWithEmailAndPassword(auth, email, pwd).then(async (res) => {
		const user = res.user;
		await setDoc(doc(db, "users", user.uid), {
			name, // name: name
		});
		const username = await getNom(user);
		localStorage.setItem("username", username);
	});
};

const logout = async () => {
	await signOut(auth).then(() => localStorage.removeItem("username"));
};

const getMarkers = async () => {
	const q = query(collection(db, "markers"));
	const snap = await getDocs(q);

	const mk = new Array();
	snap.forEach((doc) => {
		mk.push(doc.data());
	});
	return mk;
};

const addToDatabase = async (marker) => {
	console.log("Adding marker to database...");

	await addDoc(collection(db, "markers"), {
		coords: new GeoPoint(marker.coords.latitude, marker.coords.longitude),
		popup: marker.popup,
		icon: marker.icon,
	});
};

const removeFromDatabase = async (marker) => {
	console.log("Removing marker from database...");

	const { lat, lng } = marker.getLatLng();

	const q = query(
		collection(db, "markers"),
		where("coords", "==", new GeoPoint(lat, lng))
	);
	const snap = await getDocs(q);
	snap.forEach(async (m) => {
		await deleteDoc(doc(db, "markers", m.id));
	});
};

export {
	login,
	register,
	username,
	logout,
	GeoPoint,
	getMarkers,
	addToDatabase,
	removeFromDatabase,
};
