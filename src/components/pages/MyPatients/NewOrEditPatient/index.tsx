import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Button } from '../../../design/Button';
import { Input } from '../../../design/Input';
import { Modal } from '../../../design/Modal';
import { Select } from '../../../design/Select';
import { TextArea } from '../../../design/TextArea';
import { useApi } from '../../../hooks/useApi';
import { IPatient } from '../../../hooks/usePatient/models/IPatient';
import { NewOrEditPatientContainer } from './styles';

export interface INewOrEditPatientHandle {
	openPatientToEdit(patientId: string): Promise<void>;
	openNewPatient(): void;
}

export const NewOrEditPatient = forwardRef<INewOrEditPatientHandle>((props, ref) => {

	const [newPatient, setNewPatient] = useState<IPatient | null>(null);
	const { api } = useApi();

	const openPatientToEdit = useCallback<INewOrEditPatientHandle['openPatientToEdit']>(async (patientId) => {
		try {
			const { data } = await api.get(`/patients/${patientId}`);
			setNewPatient(data);
		} catch (error) {
			setNewPatient({
				id: '1',
				name: 'José Morista'
			} as IPatient);
			console.error(error);
		}
	}, [api]);

	const openNewPatient = useCallback(() => {
		setNewPatient({} as IPatient);
	}, []);

	useImperativeHandle(ref, () => ({
		openPatientToEdit,
		openNewPatient
	}));

	if (!newPatient) return null;

	return <NewOrEditPatientContainer>
		<Modal isOpen onCloseCircleClick={() => { setNewPatient(null); }}>
			<h3>{newPatient.name ? `Paciente: ${newPatient.name}` : 'Novo paciente'}</h3>
			<Input type='text' placeholder='Nome do paciente'></Input>
			<Input width='200px' type='date' placeholder='Data de nascimento'></Input>
			<Select name='sex' width='200px' placeholder='Sexo do paciente' />
			<TextArea placeholder='Observações'></TextArea>
			<div className="form-button">
				<Button variant='primary' type='submit'>{newPatient.name ? 'Editar' : 'Criar paciente'}</Button>
			</div>
		</Modal>
	</NewOrEditPatientContainer>;
});