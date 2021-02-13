import styled from 'styled-components';

export const ProcessPatientExamContainer = styled.div`
	main {
		margin: 2rem;

		> section {
			margin-bottom: 2rem;
		}
		
		> h1 {
			color: ${({ theme }) => theme.colors.primary.main};
			margin-bottom: 2.5rem;
		}

		> h2 {
			span {
				font-size: inherit;
				color: ${({ theme }) => theme.colors.primary.main};
			}
			margin-bottom: 5rem;
		}

		.processed-result-container {
			display: flex;
			justify-content: center;
			> img {
				margin: 0 1rem;
			}		
		}

		.go-next-button {
			display: flex;
			justify-content: flex-end;
		}
	}
`;