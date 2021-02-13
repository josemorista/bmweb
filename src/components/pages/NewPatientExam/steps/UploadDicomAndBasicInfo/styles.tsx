import styled from 'styled-components';

export const UploadDicomAndBasicInfoContainer = styled.section`
	form {
		> h4 {
			margin-bottom: 1rem;
		}
	}

	.upload-zone {
		height: 20vh;
		width: 100%;
		
		display: flex;
		align-items: center;
		justify-content: center;

		border: 2px dashed ${({ theme }) => theme.colors.primary.main};

		input {
			display: none;
		}

		svg {
			color: ${({ theme }) => theme.colors.primary.main};
		}
	}

	.create-exam-button {
		margin-top: 2rem;
		display: flex;
		justify-content: flex-end;
	}
`;