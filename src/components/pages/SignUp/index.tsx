import React, { useCallback } from 'react';
import { SignUpContainer } from './styles';
import huapLogo from '../../../assets/images/huapLogo.png';
import uffLogo from '../../../assets/images/uffLogo.png';
import { Input } from '../../design/Input';
import { Button } from '../../design/Button';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { IUser } from '../../hooks/useAuth/models/IUser';
import { useForm } from '../../hooks/useForm';
import { useApi } from '../../hooks/useApi';

type User = Pick<IUser, 'email' | 'firstName' | 'lastName' | 'password' | 'relatedInstitution' | 'job'>;

const initialUserState: User = {
	email: '',
	firstName: '',
	lastName: '',
	password: '',
	job: '',
	relatedInstitution: ''
};

export const SignUp: React.FC = () => {

	const { data: newUser, onInputChange: onUserInputChange } = useForm<User>({ initialState: initialUserState });

	const { api } = useApi();
	const history = useHistory();

	const onSubmit = useCallback(async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await api.post('/users', newUser);
			history.push(ROUTES.HOME);
		} catch (error) {
			console.error(error);
		}
	}, [api, newUser]);

	return (
		<SignUpContainer>
			<aside></aside>
			<main>
				<header>
					<img src={uffLogo} alt='Logo UFF'></img>
					<img src={huapLogo} alt='Logo HUAP'></img>
				</header>
				<section className='signUpForm'>
					<form onSubmit={onSubmit}>
						<Input name='firstName' value={newUser.firstName} onChange={onUserInputChange} placeholder='Primeiro nome' width='350px' type='text' />
						<br />
						<Input name='lastName' value={newUser.lastName} onChange={onUserInputChange} placeholder='Sobrenome' width='350px' type='text' />
						<br />
						<Input name='email' value={newUser.email} onChange={onUserInputChange} placeholder='Email' width='350px' type='email' />
						<br />
						<Input name='job' value={newUser.job || ''} onChange={onUserInputChange} placeholder='Profissão' width='350px' type='text' />
						<br />
						<Input name='relatedInstitution' value={newUser.relatedInstitution || ''} onChange={onUserInputChange} placeholder='Instituição' width='350px' type='text' />
						<br />
						<Input name='password' value={newUser.password} onChange={onUserInputChange} placeholder='Senha' width='350px' type='password' />
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