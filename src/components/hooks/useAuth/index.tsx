import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useApi } from '../useApi';
import { useCache } from '../useCache';
import { IUser } from './models/IUser';

interface IAuthContext {
	user: IUser;
	signed: boolean;
	setUser: React.Dispatch<React.SetStateAction<IUser>>;
	logout(): void;
}

const authContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {

	const [user, setUser] = useState({} as IUser);
	const { api } = useApi();
	const { set, invalidate, get } = useCache();

	useEffect(() => {
		set('@bm-user', user);
	}, [user]);

	useEffect(() => {
		const token = get<string>('@bm-token');
		const storageUser = get<IUser>('@bm-user');
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
		}
	}, [api]);

	const logout = useCallback(() => {
		setUser({} as IUser);
		invalidate('@bm-user');
		invalidate('@bm-token');
	}, []);

	return <authContext.Provider value={{ user, signed: true || !!user.id, setUser, logout }}>
		{children}
	</authContext.Provider>;
};

export const useAuth = (): IAuthContext => {
	const ctx = useContext(authContext);
	return ctx;
};