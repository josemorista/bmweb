import styled from 'styled-components';

export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0.6);
	
	display: flex;
	justify-content: center;
	align-items: center;
	
	.modal-body {
		border-radius: 8px;
		min-width: 60vw;
		max-width: 90vw;
		max-height: 40vh;
		background-color: ${({ theme }) => theme.colors.background.main};
		overflow: auto;
		padding: 1.5rem;
	}

`;