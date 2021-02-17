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
import { format } from 'date-fns';
export interface INewOrEditPatientProps {
	onClose(): Promise<void> | void;
}

export interface INewOrEditPatientHandle {
	openPatientToEdit(patientId: string): Promise<void>;
	openNewPatient(): void;
}

const initialPatientState: IPatient = {
	name: '',
	observations: '',
	previousBoneLesions: false,
	previousCancerDiagnosis: false,
	previousQt: false,
	previousRt: false,
	sex: 'M',
	birthDate: new Date()
} as IPatient;

export const NewOrEditPatient = forwardRef<INewOrEditPatientHandle, INewOrEditPatientProps>(({ onClose }, ref) => {

	const history = useHistory();
	const { data: newPatient, setData: setNewPatient, onSelectChange, onInputChange, onTextAreaChange } = useForm<IPatient | null>({
		initialState: null
	});
	const { setPatient } = usePatient();
	const [formEnabled, setFormEnabled] = useState(true);
	const formType = useRef<'new' | 'edit'>('new');
	const { api } = useApi();

	const openPatientToEdit = useCallback<INewOrEditPatientHandle['openPatientToEdit']>(async (patientId) => {
		try {
			const { data } = await api.get(`/patients/${patientId}`);
			formType.current = 'edit';
			setNewPatient({ ...data, birthDate: data.birthDate && new Date(data.birthDate) });
			setFormEnabled(false);
		} catch (error) {
			console.error(error);
		}
	}, [api, setNewPatient]);

	const openNewPatient = useCallback(() => {
		formType.current = 'new';
		setNewPatient(initialPatientState);
		setFormEnabled(true);
	}, [setNewPatient]);

	useImperativeHandle(ref, () => ({
		openPatientToEdit,
		openNewPatient
	}));

	const onSubmit = useCallback(async () => {
		if (newPatient) {
			try {
				if (formType.current === 'new') {
					await api.post('/patients', newPatient);
					setNewPatient(null);
					onClose();
				}
				if (formType.current === 'edit') {
					await api.put(`/patients/${newPatient.id}`, newPatient);
					setFormEnabled(false);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}, [api, newPatient, onClose, setNewPatient]);

	if (!newPatient) {
		return null;
	}

	return <NewOrEditPatientContainer>
		<Modal isOpen onCloseCircleClick={() => {
			setNewPatient(null);
			onClose();
		}}>
			<header>
				<h3>{formType.current === 'edit' ? `Paciente: ${newPatient.name}` : 'Novo paciente'}</h3>
				{formType.current === 'edit' && <div className='patient-options-buttons'>
					<Button variant='secondary' onClick={() => {
						setPatient(newPatient);
						history.push(ROUTES.PATIENT_EXAMS);
					}}>Ir para exames</Button>
					<Button variant='primary' onClick={() => {
						setFormEnabled(!formEnabled);
					}}>Editar paciente</Button>
				</div>}
			</header>

			<Input name='name' value={newPatient.name || ''} onChange={onInputChange} type='text' disabled={!formEnabled} label='Nome do paciente'></Input>

			<Input name='birthDate' value={newPatient.birthDate instanceof Date ? format(newPatient.birthDate, 'yyyy-MM-dd') : newPatient.birthDate} onChange={(e) => {
				setNewPatient({ ...newPatient, birthDate: new Date(e.target.value) });
			}} width='200px' disabled={!formEnabled} type='date' label='Data de nascimento'></Input>

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