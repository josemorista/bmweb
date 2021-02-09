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
import { ROUTES } from '../../../../consts';
import { useForm } from '../../../hooks/useForm';

export interface INewOrEditPatientHandle {
	openPatientToEdit(patientId: string): Promise<void>;
	openNewPatient(): void;
}

export const NewOrEditPatient = forwardRef<INewOrEditPatientHandle>((props, ref) => {

	const history = useHistory();
	const { data: newPatient, setData: setNewPatient, onSelectChange, onInputChange, onTextAreaChange } = useForm<IPatient>({
		initialState: {} as IPatient
	});
	const { setPatient } = usePatient();
	const [formEnabled, setFormEnabled] = useState(true);
	const formType = useRef<'new' | 'edit' | 'none'>('none');
	const { api } = useApi();

	const openPatientToEdit = useCallback<INewOrEditPatientHandle['openPatientToEdit']>(async (patientId) => {
		try {
			const { data } = await api.get(`/patients/${patientId}`);
			formType.current = 'edit';
			setNewPatient(data);
			setFormEnabled(false);
		} catch (error) {
			console.error(error);
		}
	}, [api, setNewPatient]);

	const openNewPatient = useCallback(() => {
		formType.current = 'new';
		setNewPatient({} as IPatient);
		setFormEnabled(true);
	}, [setNewPatient]);

	useImperativeHandle(ref, () => ({
		openPatientToEdit,
		openNewPatient
	}));

	const onSubmit = useCallback(async () => {
		try {
			if (formType.current === 'new') {
				console.log(newPatient);
				await api.post('/patients', newPatient);
			}
			if (formType.current === 'edit') {
				await api.put(`/patients/${newPatient.id}`, newPatient);
			}
			formType.current = 'none';
		} catch (error) {
			console.error(error);
		}
	}, [api, newPatient]);

	if (formType.current === 'none') {
		return null;
	}

	return <NewOrEditPatientContainer>
		<Modal isOpen onCloseCircleClick={() => {
			setNewPatient({} as IPatient);
			formType.current = 'none';
		}}>
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

			<Input name='name' value={newPatient.name || ''} onChange={onInputChange} type='text' disabled={!formEnabled} label='Nome do paciente'></Input>
			<Input name='birthDate' value={''} onChange={onInputChange} width='200px' disabled={!formEnabled} type='date' label='Data de nascimento'></Input>

			<Select name='sex' value={newPatient.sex} disabled={!formEnabled} onChange={onSelectChange} width='200px' options={sexOptions} label='Sexo do paciente' />

			<Select name='previousCancerDiagnosis' value={newPatient.previousCancerDiagnosis} onChange={onSelectChange} disabled={!formEnabled} width='200px' options={booleanOptions} label='Diagnóstico prévio de câncer?' />

			<Select name='previousBoneLesions' value={newPatient.previousBoneLesions} onChange={onSelectChange} disabled={!formEnabled} width='200px' options={booleanOptions} label='Lesões ósseas prévias?' />

			<Select name='previousQt' value={newPatient.previousQt} onChange={onSelectChange} disabled={!formEnabled} width='200px' options={booleanOptions} label='Realiza tratamento de quimioterapia?' />

			<Select name='previousRt' value={newPatient.previousRt} onChange={onSelectChange} disabled={!formEnabled} width='200px' options={booleanOptions} label='Realiza tratamento de radioterapia?' />

			<TextArea name='observations' value={newPatient.observations} onChange={onTextAreaChange} disabled={!formEnabled} label='Observações'></TextArea>

			{formEnabled && <div className="form-button">
				<Button onClick={() => onSubmit()} variant='primary'>{formType.current === 'edit' ? 'Salvar alterações' : 'Criar paciente'}</Button>
			</div>}
		</Modal>
	</NewOrEditPatientContainer>;
});