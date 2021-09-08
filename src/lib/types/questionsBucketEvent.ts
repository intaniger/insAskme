import type { Question } from './question';

export interface QuestionLeftEvent {
	question: Question;
}

export type QuestionEnteredEvent = QuestionLeftEvent & { indexInserted: number };

export type QuestionMovedEventPayload = {
	entered: QuestionEnteredEvent;
	left: QuestionLeftEvent;
};
