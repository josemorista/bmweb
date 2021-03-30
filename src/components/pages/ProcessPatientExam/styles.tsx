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

export const DetectionsClassificationContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;

	@media (max-width: 600px) {
		display: flex;
		flex-wrap: wrap;
	}

	> section {
		ul {
			max-width: 500px;
			max-height: 100%;
			overflow-y: auto;

			margin-top: 1rem;
			padding: 1rem;

			border: 1px solid ${({ theme }) => theme.colors.primary.main};
			border-radius: 8px;
		}

		li {
			cursor: pointer;

			padding: 1rem;

			background-color: ${({ theme }) => theme.colors.secondary.main};
			* {
				color: #000;
			}
			
			&+li {
				margin-top: 1rem;
			}

			&.inactive {
				filter: opacity(0.5);
				cursor: default;
			}

			> h4 {
				margin-bottom: 1rem;
				color: ${({ theme }) => theme.colors.primary.main};
			}
		}
	}
`;