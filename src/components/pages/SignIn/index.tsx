import React from 'react';
import { SignInContainer } from './styles';
import huapLogo from '../../../assets/images/huapLogo.png';
import uffLogo from '../../../assets/images/uffLogo.png';
import { Input } from '../../design/Input';
import { Button } from '../../design/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';

export const SignIn: React.FC = () => {
	return (
		<SignInContainer>
			<main>
				<header>
					<img src={uffLogo} alt='Logo UFF'></img>
					<img src={huapLogo} alt='Logo HUAP'></img>
				</header>
				<section className='signInForm'>
					<form>
						<Input placeholder='Email' width='400px' type='email' />
						<br />
						<Input placeholder='Senha' width='400px' type='password' />
						<br />
						<Link to={ROUTES.SIGNUP}>Não possui uma conta? Registre-se aqui</Link>
						<br />
						<br />
						<Button variant='primary'>Entrar</Button>
					</form>
				</section>
			</main>
			<aside></aside>
		</SignInContainer>
	);
};