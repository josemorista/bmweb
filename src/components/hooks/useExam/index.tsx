import React, { useContext, createContext, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { useApi } from '../useApi';
import { usePatient } from '../usePatient';
import { IExam } from './models/IExam';

interface IExamContext {
	exam: IExam;
	setExam: React.Dispatch<React.SetStateAction<IExam>>;
	revalidateExam(): Promise<void>;
}

const examContext = createContext<IExamContext>({} as IExamContext);

export const ExamContextProvider: React.FC = ({ children }) => {

	const { api } = useApi();
	const [exam, setExam] = useState<IExam>({} as IExam);

	const revalidateExam = useCallback(async () => {
		const { data } = await api.get(`/exams/${exam.id}`);
		setExam(data);
	}, [api, exam.id]);

	return <examContext.Provider value={{ exam, setExam, revalidateExam }}>
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