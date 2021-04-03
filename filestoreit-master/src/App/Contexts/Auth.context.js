import { createContext, useEffect, useState } from 'react';
import {
	firebaseAuth,
	firebaseFacebookAuthProvider,
	firebaseGithubAuthProvider,
	firebaseGoogleAuthProvider
} from '../../firebase';
import LoadingComponent from '../Components/Loading.component';
export const AuthContext = createContext();
export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);
	function signup(email, password) {
		return firebaseAuth.createUserWithEmailAndPassword(email, password);
	}
	function login(email, password) {
		return firebaseAuth.signInWithEmailAndPassword(email, password);
	}
	function logout() {
		return firebaseAuth.signOut();
	}
	function resetPassword(email) {
		return firebaseAuth.sendPasswordResetEmail(email);
	}
	function updateEmail(email) {
		return currentUser.updateEmail(email);
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password);
	}
	function githubAuth() {
		const provider = new firebaseGithubAuthProvider();
		return firebaseAuth.signInWithPopup(provider);
	}
	function googleAuth() {
		const provider = new firebaseGoogleAuthProvider();
		return firebaseAuth.signInWithPopup(provider);
	}
	function facebookAuth() {
		const provider = new firebaseFacebookAuthProvider();
		return firebaseAuth.signInWithPopup(provider);
	}
	useEffect(() => {
		const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);
	const value = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
		githubAuth,
		googleAuth,
		facebookAuth
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
			{loading && <LoadingComponent />}
		</AuthContext.Provider>
	);
}
