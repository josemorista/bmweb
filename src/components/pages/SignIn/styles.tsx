import styled from 'styled-components';
import bg from '../../../assets/images/bgHome.jpg';

export const SignInContainer = styled.div`
	height: 100vh;
	display: flex;

	main {
		flex: 1;
		display: flex;
		flex-direction: column;

		header {
			display: flex;
			flex-direction: row;
			padding: 1rem;
			height: max(10vh, 120px);
			img {
				height: 100%;
			}
		}

		.signInForm {
			padding: 1rem;
			flex-basis: 50vw;
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			
		}
	}

	aside {
			flex: 1;
			background-image: url(${bg});
			background-position: center;
			background-size: cover;
			background-repeat: none;
	}
`;