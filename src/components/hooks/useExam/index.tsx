import React, { useContext, createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { usePatient } from '../usePatient';
import { IExam } from './models/IExam';

interface IExamContext {
	exam: IExam;
	setExam: React.Dispatch<React.SetStateAction<IExam>>;
}

const examContext = createContext<IExamContext>({} as IExamContext);

export const ExamContextProvider: React.FC = ({ children }) => {

	const [exam, setExam] = useState<IExam>({} as IExam);

	return <examContext.Provider value={{ exam, setExam }}>
		{children}
	</examContext.Provider>;
};

export const useExam = (data?: { ensureExam?: boolean }): IExamContext => {

	const { patient } = usePatient({ ensurePatient: true });

	const ctx = useContext(examContext);
	const history = useHistory();

	if (data?.ensureExam && !ctx.exam.id) {
		history.push(`${ROUTES.PATIENT_EXAMS}/${patient.id}`);
	}

	return ctx;
};