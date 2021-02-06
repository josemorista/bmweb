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
		color: #312E38;
	}

	li {
		list-style: none;
	}

	a,
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
	textarea,
	a {
		font-size: 1.6rem;
	}

	p,
	a,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	label {
		color: #fff;
	}

	h1 {
		font-size: 5rem;
		@media (max-width: 400px) {
			font-size: 3.5rem;
		}
	}

	h2 {
		font-size: 3.5rem;
	}

	h3 {
		font-size: 3rem;
	}

	h4 {
		font-size: 2.5rem;
	}

	h5 {
		font-size: 2rem;
	}

	h6 {
		font-size: 1.8rem;
	}


`;