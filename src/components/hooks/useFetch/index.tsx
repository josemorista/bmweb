import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApi } from '../useApi';

interface IUseFetchParams {
	params?: Record<string, unknown>;
	timeout?: number;
}

export function useFetch<T>(url: string, { params, timeout }: IUseFetchParams) {
	const { api } = useApi();
	const [dataFetched, setDataFetched] = useState<T>();
	const [error, setError] = useState<Error | null>(null);

	const data = useMemo(() => {
		return dataFetched;
	}, [dataFetched]);

	const fetch = useCallback(async () => {
		try {
			const { data } = await api.get(url, {
				params,
				timeout
			});
			setDataFetched(data);
			setError(null);
		} catch (error) {
			setError(error);
		}
	}, [api]);

	useEffect(() => {
		fetch();
	}, []);

	return { data, revalidate: fetch, mutate: setDataFetched, error };

}