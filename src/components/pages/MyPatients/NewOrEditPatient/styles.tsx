import styled from 'styled-components';

export const NewOrEditPatientContainer = styled.div`
	h3  {
		color: ${({ theme }) => theme.colors.primary.main};
		margin-bottom: 1.5rem;
	}
	.form-button {
		display: flex;
		justify-content: flex-end;
	}
`;