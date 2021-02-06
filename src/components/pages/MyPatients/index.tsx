import React from 'react';
import { Input } from '../../design/Input';
import { AppBar } from '../../partials/AppBar';
import { MyPatientsContainer } from './styles';

const patients = [
	{
		id: '1',
		name: 'José Morista Carneiro da Silva'
	},
	{
		id: '2',
		name: 'Júlia Silva'
	}
];

export const MyPatients: React.FC = () => {
	return <MyPatientsContainer>
		<AppBar />
		<main>
			<h1>Meus pacientes</h1>
			<Input width='500px' placeholder='Digite o nome do paciente'></Input>
			<div className="patients-container">
				<ul className='patients-list'>
					{patients.map(patient => (
						<li key={patient.id}>
							<div className="patient-list-thumbnail">
								<h1>{patient.name[0]}{patient.name[1]}</h1>
							</div>
							<h6>{patient.name.slice(0, 20)}{patient.name.length > 20 && '...'}</h6>
						</li>
					))}
				</ul>
			</div>
		</main>
	</MyPatientsContainer>;
};