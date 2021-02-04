import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './styles/themes/darkTheme';
import { GlobalStyles } from './styles/GlobalStyles';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

export const App: React.FC = () => {
	return (
		<ThemeProvider theme={darkTheme}>
			<GlobalStyles />
			<SignUp />
		</ThemeProvider>);
};
