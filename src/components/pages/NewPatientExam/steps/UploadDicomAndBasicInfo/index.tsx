import React, { useCallback, useState } from 'react';
import { Input } from '../../../../design/Input';
import { Select } from '../../../../design/Select';
import { UploadDicomAndBasicInfoContainer } from './styles';
import { useDropzone } from 'react-dropzone';
import { useExam } from '../../../../hooks/useExam';
import { Button } from '../../../../design/Button';
import { useApi } from '../../../../hooks/useApi';
import { usePatient } from '../../../../hooks/usePatient';
import { useForm } from '../../../../hooks/useForm';
import { IExam } from '../../../../hooks/useExam/models/IExam';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../../../consts';

const categoryOptions = [{
	value: 'ant',
	label: 'Anterior'
}];

const initialExamState: IExam = {
	category: 'ant',
	label: '',
	patientId: '',
} as IExam;

export const UploadDicomAndBasicInfo: React.FC = () => {

	const history = useHistory();
	const { patient } = usePatient();
	const { setExam } = useExam();
	const { api } = useApi();
	const { data: newExam, onInputChange, onSelectChange } = useForm<IExam>({
		initialState: initialExamState
	});
	const [dcmFile, setDcmFile] = useState<null | File>(null);

	const onDrop = useCallback((acceptedFiles: Array<File>) => {
		if (acceptedFiles.length > 0) {
			setDcmFile(acceptedFiles[0]);
		}
	}, []);

	const onNewExamSubmit = useCallback(async (e: React.FormEvent) => {
		e.preventDefault();
		if (dcmFile) {
			const formData = new FormData();
			formData.append('dicom', dcmFile);
			formData.append('category', newExam.category);
			formData.append('label', newExam.label);
			formData.append('patientId', patient.id);
			const { data } = await api.post('/exams', formData);
			setExam(data);
			history.push(ROUTES.PATIENT_EXAMS);
		}
	}, [dcmFile, setExam, api, newExam, patient, history]);

	const { getInputProps, getRootProps } = useDropzone({ onDrop });
	return <UploadDicomAndBasicInfoContainer>
		<form onSubmit={onNewExamSubmit}>
			<h4>Para começar, atribua um nome para identificação deste exame:</h4>
			<Input name='label' placeholder='Digite um nome para o exame' type='text' value={newExam.label} onChange={onInputChange}></Input>
			<h4>Selecione a categoria deste exame:</h4>
			<Select width='40rem' name='category' value={newExam.category} onChange={onSelectChange} options={categoryOptions}></Select>
			<h4>Certo, agora basta fazer o upload do arquivo do exame a ser processado, verifique o formato e extensão .dcm:</h4>
			{!dcmFile ? <div {...getRootProps()} className="upload-zone">
				<input {...getInputProps()}></input>
				<Button variant='primary'>Upload Dicom</Button>
			</div>
				:
				<div className='upload-zone'>
					<AiOutlineCheckCircle size='10rem' />
				</div>}
			<div className="create-exam-button">
				<Button variant='primary' type='submit'>Criar Exame</Button>
			</div>
		</form>
	</UploadDicomAndBasicInfoContainer>;
};