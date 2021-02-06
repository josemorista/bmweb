import React, { useRef, useState } from 'react';
import { Button } from '../../design/Button';
import { Input } from '../../design/Input';
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks/useFetch';
import { IPatient } from '../../hooks/usePatient/models/IPatient';
import { AppBar } from '../../partials/AppBar';
import { INewOrEditPatientHandle, NewOrEditPatient } from './NewOrEditPatient';
import { MyPatientsContainer } from './styles';

const patients = [
	{
		id: '1',
		name: 'José Morista Carneiro da Silva'
	}
];

export const MyPatients: React.FC = () => {

	const { user } = useAuth();
	const newOrEditPatientRef = useRef<INewOrEditPatientHandle>(null);

	/*const { data: patients } = useFetch<Array<IPatient>>('/patients', {
		params: {
			ownerId: user.id
		}
	});*/

	if (!patients) {
		return null;
	}

	return <MyPatientsContainer>
		<NewOrEditPatient ref={newOrEditPatientRef} />
		<AppBar />
		<main>
			<h1>Meus pacientes</h1>
			<Input width='500px' placeholder='Digite o nome do paciente'></Input>
			<section className="patients-container">
				<ul className='patients-list'>
					{patients.map(patient => (
						<li key={patient.id} onClick={() => {
							newOrEditPatientRef.current?.openPatientToEdit(patient.id);
						}}>
							<div className="patient-list-thumbnail">
								<h1>{patient.name[0]}{patient.name[1]}</h1>
							</div>
							<h6>{patient.name.slice(0, 20)}{patient.name.length > 20 && '...'}</h6>
						</li>
					))}
				</ul>
			</section>
			<section className="new-patient-button">
				<Button variant='primary' onClick={() => {
					newOrEditPatientRef.current?.openNewPatient();
				}}>Novo Paciente</Button>
			</section>
		</main>
	</MyPatientsContainer>;
};