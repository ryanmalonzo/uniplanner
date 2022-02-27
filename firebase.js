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
	await signInWithEmailAndPassword(auth, email, pwd).then((userCredential) => {
		localStorage.setItem("currentUser", JSON.stringify(userCredential.user));
	});
};

const register = async (name, email, pwd) => {
	await createUserWithEmailAndPassword(auth, email, pwd).then(async (res) => {
		const user = res.user;
		await setDoc(doc(db, "users", user.uid), {
			name, // name: name
		});
		localStorage.setItem("currentUser", JSON.stringify(user));
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

	// Supprime les marqueurs de la BDD
	$.each(removed, async (undefined, marker) => {
		const { lat, lng } = marker.getLatLng();
		const q = query(
			collection(db, "markers"),
			where("coords", "==", new GeoPoint(lat, lng))
		);
		const snap = await getDocs(q);
		snap.forEach(async (m) => {
			await deleteDoc(doc(db, "markers", m.id));
		});
	});

	// Ajoute les nouveaux marqueurs
	$.each(added, async (undefined, marker) => {
		const { lat, lng } = marker.getLatLng();
		await addDoc(collection(db, "markers"), {
			coords: new GeoPoint(lat, lng),
		});
	});
};

export {
	login,
	register,
	getNom,
	logout,
	loggedIn,
	GeoPoint,
	getMarkers,
	synchronize,
};
