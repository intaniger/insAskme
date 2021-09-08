declare type DndEventInfo = import('svelte-dnd-action').DndEventInfo;

declare type DndEvent<T = any> = {
	items: T[];
	info: DndEventInfo;
};

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onconsider?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
		onfinalize?: (event: CustomEvent<DndEvent> & { target: EventTarget & T }) => void;
	}
}
