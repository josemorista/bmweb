import styled from 'styled-components';

export const PatientExamsContainer = styled.div`
	main {
		margin: 2rem;

		> section {
			margin-bottom: 2rem;
		}
		
		> h1 {
			color: ${({ theme }) => theme.colors.primary.main};
			margin-bottom: 2.5rem;
		}

		h4 {
			b {
				color: ${({ theme }) => theme.colors.primary.main};
				font-size: inherit;
			}
		}

		.exams-container {
			margin-top: 2.5rem;
			height: 16rem;
			border: 5px solid ${({ theme }) => theme.colors.primary.main};
			border-radius: 8px;
			overflow-x: auto;

			ul {
				display: flex;
			}

			li {
				margin: 0.5rem;
				text-align: center;
				width: 10rem;
				svg {
					cursor: pointer;
					color: ${({ theme }) => theme.colors.primary.main};
					margin-bottom: 1rem;
				}
			}
		}

		.new-exam-button {
			display: flex;
			justify-content: flex-end;
		}
	}
`;