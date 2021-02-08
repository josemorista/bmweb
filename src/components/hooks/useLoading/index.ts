import { useState } from 'react';

export const useLoading = ({ initialState = true }: { initialState?: boolean }) => {
	const [isLoading, setIsLoading] = useState(initialState);

	return { isLoading, setIsLoading };
};