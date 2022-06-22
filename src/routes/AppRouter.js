import React from 'react';
import { ChatPage, CreateUser, Login } from '../features';
import { Routes, Route, Navigate } from 'react-router-dom'

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/chat" element={<ChatPage />} />
			<Route path="/redirect" element={<Navigate to="/chat" />} />
			<Route path='/register' element={<CreateUser/>} />
		</Routes>
	);
}

export default AppRouter;