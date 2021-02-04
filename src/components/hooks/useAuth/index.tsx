import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useApi } from '../useApi';
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

	useEffect(() => {
		localStorage.setItem('@bm-user', JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		const token = localStorage.getItem('@bm-token');
		const storageUser = localStorage.getItem('@bm-user');
		if (token && storageUser) {
			api.post('/users/verifyToken', { token: localStorage }).then((response) => {
				const { valid } = response.data;
				if (valid) {
					api.defaults.headers['Authorization'] = `Bearer ${token}`;
					setUser(JSON.parse(storageUser));
				} else {
					logout();
				}
			});
		}
	}, [api]);

	const logout = useCallback(() => {
		localStorage.removeItem('@bm-user');
		localStorage.removeItem('@bm-token');
	}, []);

	return <authContext.Provider value={{ user, signed: !!user.id, setUser, logout }}>
		{children}
	</authContext.Provider>;
};

export const useAuth = (): IAuthContext => {
	const ctx = useContext(authContext);
	return ctx;
};