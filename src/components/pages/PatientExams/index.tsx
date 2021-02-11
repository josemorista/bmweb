import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { usePatient } from '../../hooks/usePatient';
import { AppBar } from '../../partials/AppBar';
import { PatientExamsContainer } from './styles';
import { AiOutlineFileDone } from 'react-icons/ai';
import { IExam } from '../../hooks/useExam/models/IExam';
import { format } from 'date-fns';

export const PatientExams: React.FC = () => {
	const { patient } = usePatient({
		ensurePatient: true
	});

	const { data: exams } = useFetch<Array<IExam>>('/exams', {
		params: {
			patientId: patient.id
		}
	});

	if (!exams) {
		return null;
	}

	return <PatientExamsContainer>
		<AppBar />
		<main>
			<h1>Exames: {patient.name}</h1>
			<section>
				<h4>Exames processados <b>(ANTERIOR)</b>:</h4>
				<div className='exams-container'>
					<ul>
						{exams.map(exam => (<li key={exam.id}>
							<AiOutlineFileDone size='7rem' />
							<h6>{exam.label}</h6>
							<p>{format(exam.createdAt, 'dd/MM/yyyy')}</p>
						</li>))}
					</ul>
				</div>
			</section>
			<section>
				<h4>Exames processados  <b>(POSTERIOR)</b>:</h4>
				<div className='exams-container'></div>
			</section>
			<section>
				<h4>Exames processados  <b>(CRÂNIO)</b>:</h4>
				<div className='exams-container'></div>
			</section>
		</main>
	</PatientExamsContainer>;
};