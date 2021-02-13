import styled from 'styled-components';

export const NewPatientExamContainer = styled.div`
	main {
		margin: 2rem;

		> section {
			margin-bottom: 2rem;
		}
		
		> h1 {
			color: ${({ theme }) => theme.colors.primary.main};
			margin-bottom: 2.5rem;
		}
	}
`;