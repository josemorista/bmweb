import { useState, useCallback } from 'react';

export function useForm<T>({ initialState }: { initialState: T }) {
	const [data, setData] = useState<T>(initialState);

	const onInputChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = target;
		setData(values => ({ ...values, [name]: value }));
	}, []);

	return { data, onInputChange };
}