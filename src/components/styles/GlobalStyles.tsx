import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		outline: 0;
		font-size: 62.5%;
		box-sizing: border-box;
		box-shadow: none;
		border: none;
		font-family: -apple-system, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		color: #fff;
	}

	input,
	button {
		border-radius: 5px;
	}

	button {
		cursor: pointer;
		padding: 0;
	}

	body {
		background-color: #312E38;
	}

	p,
	label,
	input,
	span,
	div,
	section,
	button,
	main,
	a {
		font-size: 1.6rem;
	}

	h1 {
		font-size: 3rem;
	}

	h2 {
		font-size: 2.5rem;
	}


`;