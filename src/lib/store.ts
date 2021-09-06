import { initializeApp } from 'firebase/app';
import {
	Database,
	get,
	getDatabase,
	onValue,
	orderByKey,
	push,
	query,
	ref,
	set
} from 'firebase/database';
import { readable } from 'svelte/store';
import type { IQuestionBody } from './types/question';
import { QuestionType } from './types/questionType';
import type { WithId } from './types/withId';

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
export type Question = WithId<IQuestionBody>;

type QuestionTypeKey = keyof typeof QuestionType;
export type TypedQuestion = { [k in QuestionTypeKey]?: Question[] };

const withIdMapper = (raw?: Record<string, IQuestionBody>): Question[] =>
	Object.entries(raw || {}).map(([id, value]) => ({ id, ...value }));

const typedSeperate = (Qs: Question[]): TypedQuestion =>
	[QuestionType.InCurious, QuestionType.Scheduled, QuestionType.Archeived]
		.map<[QuestionType, Question[]]>((t) => [
			t,
			Qs.map(({ id, ...rest }) => ({ id: `${t}-${id}`, ...rest }))
		])
		.reduce<TypedQuestion>(
			(acc, [type, Qs]) => ({
				...acc,
				[type]: Qs
			}),
			{}
		);

export const ReadonlyFirebaseRTDBStore = readable<Promise<TypedQuestion> | TypedQuestion>(
	new Promise((resolve, reject) => {
		const Q = query(questionsRef, orderByKey());
		get(Q)
			.then((snapshot) => {
				resolve(typedSeperate(withIdMapper(snapshot.val())));
			})
			.catch(reject);
	}),
	(setter) => {
		onValue(questionsRef, (snapshot) => {
			setter(typedSeperate(withIdMapper(snapshot.val())));
		});
	}
);

export const createNewQuestion = (question: IQuestionBody): Promise<void> =>
	set(push(questionsRef), question);

export const _removeAllQuestions = (): Promise<void> => set(questionsRef, null);
