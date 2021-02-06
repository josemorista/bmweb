import styled from 'styled-components';

export const NewOrEditPatientContainer = styled.div`
	h3  {
		color: ${({ theme }) => theme.colors.primary.main};
		margin-bottom: 1.5rem;
	}
	> * {
		margin: 0.5rem 0;
	}
`;