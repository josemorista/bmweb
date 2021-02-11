import React, { useMemo, useRef, useState } from 'react';
import { Button } from '../../design/Button';
import { Input } from '../../design/Input';
import { useAuth } from '../../hooks/useAuth';
import { useFetch } from '../../hooks/useFetch';
import { IPatient } from '../../hooks/usePatient/models/IPatient';
import { AppBar } from '../../partials/AppBar';
import { INewOrEditPatientHandle, NewOrEditPatient } from './NewOrEditPatient';
import { MyPatientsContainer } from './styles';

export const MyPatients: React.FC = () => {

	const { user } = useAuth();
	const [patientToSearch, setPatientToSearch] = useState('');
	const newOrEditPatientRef = useRef<INewOrEditPatientHandle>(null);

	const params = useMemo(() => ({
		ownerId: user.id
	}), [user.id]);

	const { data: patientsFetched, revalidate } = useFetch<Array<IPatient>>('/patients', {
		params
	});

	const patients = useMemo(() => {
		if (patientsFetched) {
			return patientsFetched?.filter(patient => patient.name.toLowerCase().includes(patientToSearch.toLowerCase()));
		}
		return [];
	}, [patientsFetched, patientToSearch]);


	return <MyPatientsContainer>
		<NewOrEditPatient ref={newOrEditPatientRef} onClose={() => {
			revalidate();
		}} />
		<AppBar />
		<main>
			<h1>Meus pacientes</h1>
			<Input width='500px' value={patientToSearch} onChange={(e) => { setPatientToSearch(e.target.value); }} placeholder='Digite o nome do paciente'></Input>
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