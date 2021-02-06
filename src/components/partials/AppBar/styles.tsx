import styled from 'styled-components';
import { Button } from '../../design/Button';

export const AppBarContainer = styled.header`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: 7rem;
	background-color: ${({ theme }) => theme.colors.primary.main};
	> ${Button} {
		max-height: 5rem;
		margin: 0.5rem;
	}
`;