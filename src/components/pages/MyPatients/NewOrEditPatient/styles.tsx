import styled from 'styled-components';

export const NewOrEditPatientContainer = styled.div`
	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		
		h3  {
			color: ${({ theme }) => theme.colors.primary.main};
		}

		.patient-options-buttons {
			margin-left: 1rem;
			> * {
				margin: 0 0.5rem;
			}
		}

		margin-bottom: 2rem;
	}
	.form-button {
		display: flex;
		justify-content: flex-end;
	}
`;