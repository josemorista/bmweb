import styled from 'styled-components';


interface IStyledSelectProps {
	width: string;
}
export const SelectContainer = styled.div<IStyledSelectProps>`
	width: ${({ width }) => width};
	max-width: 100%;
	margin-bottom: 1rem;
`;