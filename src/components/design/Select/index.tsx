import React, { useMemo } from 'react';
import CustomSelect, { Props } from 'react-select';
import { useTheme } from 'styled-components';
import { Input } from '../Input';
import { SelectContainer } from './styles';

interface ISelectProps extends Omit<Props, 'value' | 'options'> {
	width?: string;
	label?: string;
	disabled?: boolean;
	placeholder?: string;
	onChange?: any;
	value?: string | number | boolean;
	options: any;
}

export const Select: React.FC<ISelectProps> = ({ width, label, options, placeholder, value, disabled, name, onChange, ...rest }) => {
	const myTheme = useTheme() as { colors: any };

	const currentValue = useMemo(() => {
		if (value !== undefined) {
			return options?.find((el: any) => el.value === String(value));
		}
	}, [value, options]);

	if (disabled) {
		return <Input disabled value={currentValue.label} label={label} width={width} placeholder={placeholder} />;
	}

	return <SelectContainer width={width || '100%'}>
		{label && <p>{label}:</p>}
		<CustomSelect {...rest} options={options} placeholder={placeholder || ''} theme={theme => ({
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
		}} noOptionsMessage={() => '...'} onChange={(e) => {
			if (onChange && e) {
				onChange({ ...e, name: name });
			}
		}} value={currentValue}
		/>
	</SelectContainer>;
};