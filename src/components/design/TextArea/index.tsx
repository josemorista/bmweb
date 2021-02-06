import React, { useState } from 'react';
import { StyledTextArea } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	width?: string;
}

export const TextArea: React.FC<InputProps> = ({ width, ...rest }) => {
	const [isFocused, setIsFocused] = useState(false);
	return <StyledTextArea width={width || '100%'} isFocused={isFocused} {...rest}
		onFocus={() => {
			setIsFocused(true);
		}}
		onBlur={() => {
			setIsFocused(false);
		}} />;
};
