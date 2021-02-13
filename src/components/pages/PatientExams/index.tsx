import React, { useMemo } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { usePatient } from '../../hooks/usePatient';
import { AppBar } from '../../partials/AppBar';
import { PatientExamsContainer } from './styles';
import { AiOutlineFileDone } from 'react-icons/ai';
import { IExam } from '../../hooks/useExam/models/IExam';
import { format } from 'date-fns';
import { Button } from '../../design/Button';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { useExam } from '../../hooks/useExam';

export const PatientExams: React.FC = () => {

	const history = useHistory();

	const { patient } = usePatient({
		ensurePatient: true
	});

	const { setExam } = useExam();

	const { data: exams } = useFetch<Array<IExam>>('/exams', {
		params: {
			patientId: patient.id
		}
	});

	const categorizedExams: Record<string, Array<IExam>> = useMemo(() => {
		const serializedExams = exams?.map(exam => ({ ...exam, createdAt: typeof exam.createdAt === 'string' ? new Date(exam.createdAt) : exam.createdAt })) || [];
		return {
			ant: serializedExams.filter(el => el.category === 'ant')
		};
	}, [exams]);

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
						{categorizedExams['ant'].map(exam => (<li key={exam.id} onClick={() => {
							setExam(exam);
							history.push(ROUTES.PROCESS_PATIENT_EXAM);
						}}>
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
			<footer className='new-exam-button'>
				<Button variant='primary' onClick={() => {
					history.push(ROUTES.NEW_PATIENT_EXAM);
				}}>Novo Exame</Button>
			</footer>
		</main>
	</PatientExamsContainer>;
};