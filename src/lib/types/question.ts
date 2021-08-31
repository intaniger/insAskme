import type { QuestionType } from './questionType';

export interface IQuestionBody {
	questioner: string;
	question: string;
	upvote: number;
	status: QuestionType;
	attachments?: string[];
}
