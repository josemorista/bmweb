import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../consts';
import { IPatient } from './models/IPatient';

interface IPatientContext {
	patient: IPatient;
	setPatient: React.Dispatch<React.SetStateAction<IPatient>>;
	hasPatient: boolean;
	clearPatient(): void;
}

const patientContext = createContext<IPatientContext>({} as IPatientContext);

export const PatientContextProvider: React.FC = ({ children }) => {

	const [patient, setPatient] = useState({} as IPatient);

	const clearPatient = useCallback(() => {
		setPatient({} as IPatient);
	}, []);

	return <patientContext.Provider value={{ patient, setPatient, clearPatient, hasPatient: !!patient.id }}>
		{children}
	</patientContext.Provider>;
};

export const usePatient = (data?: { ensurePatient?: boolean }): IPatientContext => {
	const history = useHistory();
	const ctx = useContext(patientContext);
	if (data?.ensurePatient && !ctx.patient.id) {
		history.push(ROUTES.HOME);
	}
	return ctx;
};