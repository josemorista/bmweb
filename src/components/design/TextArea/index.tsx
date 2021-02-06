import React, { useState } from 'react';
import { StyledTextArea, TextAreaContainer } from './styles';

interface InputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	width?: string;
}

export const TextArea: React.FC<InputProps> = ({ width, label, ...rest }) => {
	const [isFocused, setIsFocused] = useState(false);
	return <TextAreaContainer>
		{label && <p>{label}:</p>}
		<StyledTextArea width={width || '100%'} isFocused={isFocused} {...rest}
			onFocus={() => {
				setIsFocused(true);
			}}
			onBlur={() => {
				setIsFocused(false);
			}} />
	</TextAreaContainer>;
};
