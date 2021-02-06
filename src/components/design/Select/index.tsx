import React from 'react';
import CustomSelect, { Props } from 'react-select';
import { useTheme } from 'styled-components';
import { SelectContainer } from './styles';

interface ISelectProps extends Props {
	width?: string;
}

export const Select: React.FC<ISelectProps> = ({ width, ...rest }) => {
	const myTheme = useTheme() as { colors: any };
	return <SelectContainer width={width || '100%'}>
		<CustomSelect {...rest} theme={theme => ({
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