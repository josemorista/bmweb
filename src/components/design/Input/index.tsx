import React, { useState } from 'react';
import { StyledInput } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	width?: string;
}

export const Input: React.FC<InputProps> = ({ width, ...rest }) => {
	const [isFocused, setIsFocused] = useState(false);
	return <StyledInput width={width || '100%'} isFocused={isFocused} {...rest}
		onFocus={() => {
			setIsFocused(true);
		}}
		onBlur={() => {
			setIsFocused(false);
		}} />;
};
