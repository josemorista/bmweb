import { useState, useCallback } from 'react';

export function useForm<T>({ initialState }: { initialState: T }) {
	const [data, setData] = useState<T>(initialState);

	const onInputChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = target;
		setData(values => ({ ...values, [name]: value }));
	}, []);

	const onTextAreaChange = useCallback(({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value, name } = target;
		setData(values => ({ ...values, [name]: value }));
	}, []);

	const onSelectChange = useCallback((event: { value: string; name: string } | null) => {
		// Parse values
		if (event) {
			const { value, name } = event;
			let parsed: string | boolean | number = value;
			value === 'true' && (parsed = true);
			value === 'false' && (parsed = false);
			setData(values => ({ ...values, [name]: parsed }));
		}
	}, []);

	return { data, onInputChange, onSelectChange, onTextAreaChange, setData };
}