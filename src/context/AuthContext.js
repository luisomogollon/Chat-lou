import axios from '../lib/axios'
import React from 'react';
import { createContext, useState } from 'react';
import storage from '../utils/storage'
import { createUser } from '../services/user';

export const AuthContext = createContext();

const initialAuth = {
	checking: true,
	logged: false,
};

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(initialAuth);

	const login = async (email, password) => {
		const loginRes = await axios.post('/login', { email, password });
		storage.setToken(loginRes.authorization);
		if (loginRes?.status === 200) {
			setAuth({
				checking: false,
				logged: true,
			});
			return;
		}
		setAuth({
			checking: false,
			logged: false,
		});
	};

	const register = async (registerBody) => {
		try {
			await createUser({ ...registerBody, type: 'consumer' })
			setAuth({
				checking: false,
				logged: true,
			});
			return;
		} catch (error) {
			throw new Error(error)
		}
	};

	const logout = () => {
		storage.clearToken()
		setAuth({
			checking: false,
			logged: false,
		});
	};

	return <AuthContext.Provider value={{ auth, login, logout, register }}>{children}</AuthContext.Provider>;
};