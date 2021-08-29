export const randomElementFromArray = <E>(array: E[]): E =>
	array[Math.floor(Math.random() * array.length)];
