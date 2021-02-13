import React, { useState } from 'react';
import { usePatient } from '../../hooks/usePatient';
import { AppBar } from '../../partials/AppBar';
import { UploadDicomAndBasicInfo } from './steps/UploadDicomAndBasicInfo';
import { NewPatientExamContainer } from './styles';


export const NewPatientExam: React.FC = () => {

	const { patient } = usePatient();

	return <NewPatientExamContainer>
		<AppBar />
		<main>
			<h1>Novo exame: {patient.name}</h1>
			<UploadDicomAndBasicInfo></UploadDicomAndBasicInfo>
		</main>
	</NewPatientExamContainer>;
};