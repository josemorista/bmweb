import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/themes/darkTheme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Routes } from './routes';
import { AuthContextProvider } from './hooks/useAuth';

export const App: React.FC = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<GlobalStyles />
			<AuthContextProvider>
				<Routes />
			</AuthContextProvider>
		</ThemeProvider>);
};
