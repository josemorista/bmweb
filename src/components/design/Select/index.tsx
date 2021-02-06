import React from 'react';
import CustomSelect, { Props } from 'react-select';
import { useTheme } from 'styled-components';
import { Input } from '../Input';
import { SelectContainer } from './styles';

interface ISelectProps extends Props {
	width?: string;
	label?: string;
	disabled?: boolean;
	placeholder?: string;
}

export const Select: React.FC<ISelectProps> = ({ width, label, placeholder, disabled, ...rest }) => {
	const myTheme = useTheme() as { colors: any };
	if (disabled) {
		return <Input disabled label={label} width={width} placeholder={placeholder} />;
	}
	return <SelectContainer width={width || '100%'}>
		{label && <p>{label}:</p>}
		<CustomSelect {...rest} placeholder={placeholder || ''} theme={theme => ({
			...theme,
			colors: {
				...theme.colors,
				primary: myTheme.colors.primary.main
			}
		})} styles={{
			input: () => ({
				padding: '1.5rem',
				borderRadius: '8px'
			}),
			option: () => ({
				padding: '1.5rem',
				cursor: 'pointer',
				':hover': {
					background: myTheme.colors.primary.main
				}
			})
		}} noOptionsMessage={() => '...'} />
	</SelectContainer>;
};