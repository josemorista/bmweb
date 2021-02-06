import React, { useState } from 'react';
import { InputContainer, StyledInput } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	width?: string;
}

export const Input: React.FC<InputProps> = ({ width, label, ...rest }) => {
	const [isFocused, setIsFocused] = useState(false);
	return (<InputContainer>
		{label && <p>{label}:</p>}
		<StyledInput width={width || '100%'} isFocused={isFocused} {...rest}
			onFocus={() => {
				setIsFocused(true);
			}}
			onBlur={() => {
				setIsFocused(false);
			}} />
	</InputContainer>);
};
