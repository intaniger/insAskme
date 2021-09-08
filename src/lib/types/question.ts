import type { QuestionType } from './questionType';
import type { WithId } from './withId';

export interface IQuestionBody {
	questioner: string;
	question: string;
	upvote: number;
	status: QuestionType;
	attachments?: string[];
}

export type Question = WithId<IQuestionBody>;
