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

	const markers = new Array();
	snap.forEach((doc) => {
		markers.push(doc.data());
	});
	return markers;
};

const synchronize = (oldMarkers, newMarkers) => {
	console.log("Synchronizing markers to database...");

	const removed = oldMarkers.filter((m) => !newMarkers.find((e) => m == e));
	const added = newMarkers.filter((m) => !oldMarkers.find((e) => m == e));

	// Retire de la BDD les marqueurs supprimés localement
	$.each(removed, async (undefined, marker) => {
		const q = query(
			collection(db, "markers"),
			where(
				"coords",
				"==",
				new GeoPoint(marker.coords.latitude, marker.coords.longitude)
			)
		);
		const snap = await getDocs(q);
		snap.forEach(async (m) => {
			await deleteDoc(doc(db, "markers", m.id));
		});
	});

	// Ajoute les nouveaux marqueurs
	$.each(added, async (undefined, marker) => {
		await addDoc(collection(db, "markers"), {
			coords: new GeoPoint(marker.coords.latitude, marker.coords.longitude),
			popup: marker.popup,
			icon: marker.icon,
		});
	});
};

export { login, register, username, logout, GeoPoint, getMarkers, synchronize };
