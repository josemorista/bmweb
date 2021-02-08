import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useApi } from '../useApi';
import { useCache } from '../useCache';
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

	useEffect(() => {
		set('user', user);
	}, [user, set]);

	const logout = useCallback(() => {
		setUser({} as IUser);
		invalidate('user');
		invalidate('token');
	}, [invalidate]);

	const login = useCallback(async ({ email, password }: Pick<IUser, 'email' | 'password'>): Promise<void> => {
		const { data } = await api.post('/users/sessions', { email, password });
		setUser(data.user);
		api.defaults.headers['Authorization'] = `Bearer ${data.token}`;
	}, [api]);

	useEffect(() => {
		const token = get<string>('token');
		const storageUser = get<IUser>('user');
		if (token && storageUser) {
			api.post('/users/verifyToken', { token: localStorage }).then((response) => {
				const { valid } = response.data;
				if (valid) {
					api.defaults.headers['Authorization'] = `Bearer ${token}`;
					setUser(storageUser);
				} else {
					logout();
				}
			});
		} else {
			logout();
		}
	}, [api, logout, get]);

	return <authContext.Provider value={{ user, signed: !!user.id, setUser, logout, login }}>
		{children}
	</authContext.Provider>;
};

export const useAuth = (): IAuthContext => {
	const ctx = useContext(authContext);
	return ctx;
};