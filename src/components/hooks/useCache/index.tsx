
const set = (key: string, data: unknown): void => {
	localStorage.setItem(`@bmweb:${key}`, JSON.stringify(data));
};

function get<T>(key: string): T | undefined {
	const data = localStorage.getItem(`@bmweb:${key}`);
	if (data) {
		return JSON.parse(data) as T;
	}
	return undefined;
}

const invalidate = (key: string) => {
	localStorage.removeItem(`@bmweb:${key}`);
};

export const useCache = (): { set: typeof set, invalidate: typeof invalidate, get: typeof get } => {
	return { invalidate, set, get };
};