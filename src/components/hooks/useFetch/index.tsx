import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../useApi';

interface IUseFetchParams {
	params?: Record<string, number | string | boolean>;
	timeout?: number;
}

export function useFetch<T>(url: string, { params, timeout = 5000 }: IUseFetchParams) {
	const { api } = useApi();
	const [dataFetched, setDataFetched] = useState<T>();
	const [error, setError] = useState<Error | null>(null);

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
	}, [api, url, timeout]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return { data: dataFetched, revalidate: fetch, mutate: setDataFetched, error };

}