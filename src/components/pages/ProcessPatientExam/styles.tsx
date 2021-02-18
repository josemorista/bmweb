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
			flex-wrap: wrap;
			margin: 1rem 0;
			> img {
				margin: 0 1rem;
			}		
		}

		.go-next-button {
			display: flex;
			justify-content: flex-end;
		}

		.histogram-container {
			display: flex;
			flex-wrap: wrap;
			img {
				max-width: 100%;
				height: auto;
				max-height: 30rem;
			}
			> section {
				margin-right: 2rem;
			}
			margin-bottom: 2rem;
		}
	}
`;