export function getErrorFlag<T>(error: Array<T>) {
	if (error === undefined) return false;
	return error[0] !== undefined;
}