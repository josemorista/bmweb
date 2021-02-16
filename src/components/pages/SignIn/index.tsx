import React, { useCallback } from 'react';
import { SignInContainer } from './styles';
import huapLogo from '../../../assets/images/huapLogo.png';
import uffLogo from '../../../assets/images/uffLogo.png';
import { Input } from '../../design/Input';
import { Button } from '../../design/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { useForm } from '../../hooks/useForm';
import { IUser } from '../../hooks/useAuth/models/IUser';
import { useAuth } from '../../hooks/useAuth';

export const SignIn: React.FC = () => {
	const { login } = useAuth();
	const { data: user, onInputChange: onUserInputChange } = useForm<Pick<IUser, 'email' | 'password'>>({
		initialState: {
			email: '',
			password: ''
		}
	});

	const onSubmit = useCallback(async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await login(user);
		} catch (error) {
			console.error(error);
		}
	}, [user, login]);

	return (
		<SignInContainer>
			<main>
				<header>
					<img src={uffLogo} alt='Logo UFF'></img>
					<img src={huapLogo} alt='Logo HUAP'></img>
				</header>
				<section className='signInForm'>
					<form onSubmit={onSubmit}>
						<Input name='email' value={user.email} onChange={onUserInputChange} placeholder='Email' width='350px' type='email' />
						<br />
						<Input name='password' value={user.password} onChange={onUserInputChange} placeholder='Senha' width='350px' type='password' />
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