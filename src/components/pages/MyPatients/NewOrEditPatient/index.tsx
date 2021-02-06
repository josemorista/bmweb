import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Button } from '../../../design/Button';
import { Input } from '../../../design/Input';
import { Modal } from '../../../design/Modal';
import { Select } from '../../../design/Select';
import { TextArea } from '../../../design/TextArea';
import { useApi } from '../../../hooks/useApi';
import { usePatient } from '../../../hooks/usePatient';
import { IPatient } from '../../../hooks/usePatient/models/IPatient';
import { booleanOptions, sexOptions } from './options';
import { NewOrEditPatientContainer } from './styles';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../consts';

export interface INewOrEditPatientHandle {
	openPatientToEdit(patientId: string): Promise<void>;
	openNewPatient(): void;
}

export const NewOrEditPatient = forwardRef<INewOrEditPatientHandle>((props, ref) => {

	const history = useHistory();
	const [newPatient, setNewPatient] = useState<IPatient | null>(null);
	const { setPatient } = usePatient();
	const [formEnabled, setFormEnabled] = useState(true);
	const formType = useRef<'new' | 'edit'>('new');
	const { api } = useApi();

	const openPatientToEdit = useCallback<INewOrEditPatientHandle['openPatientToEdit']>(async (patientId) => {
		try {
			const { data } = await api.get(`/patients/${patientId}`);
			formType.current = 'edit';
			setNewPatient(data);
			setFormEnabled(false);
		} catch (error) {
			formType.current = 'edit';
			setFormEnabled(false);
			setNewPatient({
				id: '1',
				name: 'Jhon Doe',
				birthDate: new Date(15, 1, 1996),
				observations: '',
				previousBoneLesions: false,
				previousCancerDiagnosis: false,
				previousQt: false,
				previousRt: false,
				sex: 'M'
			});
			console.error(error);
		}
	}, [api]);

	const openNewPatient = useCallback(() => {
		formType.current = 'new';
		setNewPatient({} as IPatient);
		setFormEnabled(true);
	}, []);

	useImperativeHandle(ref, () => ({
		openPatientToEdit,
		openNewPatient
	}));

	if (!newPatient) return null;

	return <NewOrEditPatientContainer>
		<Modal isOpen onCloseCircleClick={() => { setNewPatient(null); }}>
			<header>
				<h3>{formType.current === 'edit' ? `Paciente: ${newPatient.name}` : 'Novo paciente'}</h3>
				{formType.current === 'edit' && <div className='patient-options-buttons'>
					<Button variant='secondary' onClick={() => {
						setPatient(newPatient);
						history.push(ROUTES.PATIENT_EXAMS);
					}}>Ir para exames</Button>
					<Button variant='primary' onClick={() => { setFormEnabled(!formEnabled); }}>Editar paciente</Button>
				</div>}
			</header>
			<Input type='text' disabled={!formEnabled} label='Nome do paciente'></Input>
			<Input width='200px' disabled={!formEnabled} type='date' label='Data de nascimento'></Input>
			<Select name='sex' disabled={!formEnabled} width='200px' options={sexOptions} label='Sexo do paciente' />
			<Select name='sex' disabled={!formEnabled} width='200px' options={booleanOptions} label='Diagnóstico prévio de câncer?' />
			<Select name='sex' disabled={!formEnabled} width='200px' options={booleanOptions} label='Realiza tratamento de quimioterapia?' />
			<Select name='sex' disabled={!formEnabled} width='200px' options={booleanOptions} label='Realiza tratamento de radioterapia?' />
			<TextArea disabled={!formEnabled} label='Observações'></TextArea>
			{formEnabled && <div className="form-button">
				<Button variant='primary' type='submit'>{formType.current === 'edit' ? 'Salvar alterações' : 'Criar paciente'}</Button>
			</div>}
		</Modal>
	</NewOrEditPatientContainer>;
});