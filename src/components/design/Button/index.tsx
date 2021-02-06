import styled from 'styled-components';
import { shade } from 'polished';

interface IButtonProps {
	variant: 'primary' | 'secondary' | 'default';
}

export const Button = styled.button<IButtonProps>`
	padding: 1.5rem;
	border-radius: 5px;
	color: ${({ theme, variant }) => theme.colors[variant].contrast};
	background-color: ${({ theme, variant }) => theme.colors[variant].main};;
	transition: background-color 0.25s;
	&:hover {
		background-color: ${({ theme, variant }) => shade(0.15, theme.colors[variant].main)}
	}
`;