import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		outline: 0;
		font-size: 62.5%;
		box-sizing: border-box;
		box-shadow: none;
		border: none;
		font-family: -apple-system, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
	strong,
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
		font-size: 4rem;
		@media (max-width: 400px) {
			font-size: 3.2rem;
		}
	}

	h2 {
		font-size: 3rem;
	}

	h3 {
		font-size: 2.8rem;
	}

	h4 {
		font-size: 2.3rem;
	}

	h5 {
		font-size: 1.8rem;
	}

	h6 {
		font-size: 1.6rem;
	}


`;