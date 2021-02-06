import React from 'react';
import { Button } from '../../design/Button';
import { AppBarContainer } from './styles';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../consts';
import { useAuth } from '../../hooks/useAuth';

export const AppBar: React.FC = () => {
	const history = useHistory();
	const { logout } = useAuth();

	return <AppBarContainer>
		<Button variant='secondary' onClick={() => {
			history.push(ROUTES.HOME);
		}}>
			Início
		</Button>
		<Button variant='secondary' onClick={
			() => {
				logout();
			}
		}>
			Sair
		</Button>
	</AppBarContainer >;
};