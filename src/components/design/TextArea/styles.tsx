import styled, { css } from 'styled-components';

interface IStyledTextAreaProps {
	isFocused: boolean;
	width: string;
}

export const TextAreaContainer = styled.div`
	p {
		margin-bottom: 1rem;
	}
`;

export const StyledTextArea = styled.textarea<IStyledTextAreaProps>`
	padding: 1.5rem;
	width: ${({ width }) => width};
	max-width: 100%;
	margin-bottom: 1rem;
	background-color: ${({ theme }) => theme.colors.secondary.main};
	border: 2px solid transparent;
	border-radius: 8px;
	transition: border-color 0.25s;
	${({ isFocused, theme }) => isFocused && css`
		border-color: ${theme.colors.primary.main}
	`}
	&:disabled {
		background-color: transparent;
		color: ${({ theme }) => theme.colors.secondary.main};
	}
`;