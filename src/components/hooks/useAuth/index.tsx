import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useApi } from '../useApi';
import { useCache } from '../useCache';
import { useLoading } from '../useLoading';
import { IUser } from './models/IUser';

interface IAuthContext {
	user: IUser;
	signed: boolean;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
	login(data: Pick<IUser, 'email' | 'password'>): Promise<void>;
	logout(): void;
}

const authContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {

	const [user, setUser] = useState({} as IUser);
	const { api } = useApi();
	const { set, invalidate, get } = useCache();
	const { isLoading, setIsLoading } = useLoading({
		initialState: true
	});

	useEffect(() => {
		if (user.id) {
			set('user', user);
		}
	}, [user, set]);

	const logout = useCallback(() => {
		setUser({} as IUser);
		invalidate('user');
		invalidate('token');
	}, [invalidate]);

	const login = useCallback(async ({ email, password }: Pick<IUser, 'email' | 'password'>): Promise<void> => {
		const { data } = await api.post('/users/sessions', { email, password });
		setUser(data.user);
		set('token', data.token);
		api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
	}, [api, set]);

	useEffect(() => {
		const token = get<string>('token');
		const storageUser = get<IUser>('user');

		if (token && storageUser) {
			api.post('/users/sessions/verify', { token }).then((response) => {
				const { valid } = response.data;
				if (valid) {
					api.defaults.headers['Authorization'] = `Bearer ${token}`;
					setUser(storageUser);
					setIsLoading(false);
				} else {
					logout();
					setIsLoading(false);
				}
			});
		} else {
			setIsLoading(false);
		}
	}, [api, logout, get, setIsLoading]);

	if (isLoading) {
		return null;
	}

	return <authContext.Provider value={{ user, signed: !!user.id, setUser, logout, login }}>
		{children}
	</authContext.Provider>;
};

export const useAuth = (): IAuthContext => {
	const ctx = useContext(authContext);
	return ctx;
};