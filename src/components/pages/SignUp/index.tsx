import React from 'react';
import { SignUpContainer } from './styles';
import huapLogo from '../../../assets/images/huapLogo.png';
import uffLogo from '../../../assets/images/uffLogo.png';
import { Input } from '../../design/Input';
import { Button } from '../../design/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';

export const SignUp: React.FC = () => {
	return (
		<SignUpContainer>
			<aside></aside>
			<main>
				<header>
					<img src={uffLogo} alt='Logo UFF'></img>
					<img src={huapLogo} alt='Logo HUAP'></img>
				</header>
				<section className='signUpForm'>
					<form>
						<Input placeholder='Primeiro nome' width='400px' type='text' />
						<br />
						<Input placeholder='Sobrenome' width='400px' type='text' />
						<br />
						<Input placeholder='Email' width='400px' type='email' />
						<br />
						<Input placeholder='Senha' width='400px' type='password' />
						<br />
						<Link to={ROUTES.HOME}>Já possui uma conta?</Link>
						<br />
						<br />
						<Button variant='primary'>Registrar</Button>
					</form>
				</section>
			</main>
		</SignUpContainer>
	);
};