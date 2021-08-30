import { initializeApp } from 'firebase/app';
import { Database, get, getDatabase, onValue, orderByKey, query, ref } from 'firebase/database';
import { readable } from 'svelte/store';
import type { IQuestion } from './types/question';

const firebaseConfig = {
	apiKey: 'AIzaSyDihuJrjMTTKLXXhOEYtpA1_rS3h6xmJKs',
	authDomain: 'instern-askme.firebaseapp.com',
	databaseURL: 'https://instern-askme-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'instern-askme',
	storageBucket: 'instern-askme.appspot.com',
	messagingSenderId: '662377424057',
	appId: '1:662377424057:web:4c9bc6862a94fc7525a768',
	measurementId: 'G-VSLQDDLB58'
};

const getRealtimeDB = (): Database => {
	const app = initializeApp(firebaseConfig);
	return getDatabase(app);
};

const db = getRealtimeDB();
const questionsRef = ref(db, 'Qs');

export const firebaseRDBStore = readable<Promise<IQuestion[]> | IQuestion[]>(
	new Promise((resolve, reject) => {
		const Q = query(questionsRef, orderByKey());
		get(Q)
			.then((snapshot) => resolve(snapshot.val()))
			.catch(reject);
	}),
	(setter) => {
		onValue(questionsRef, (snapshot) => {
			setter(snapshot.val());
		});
	}
);
