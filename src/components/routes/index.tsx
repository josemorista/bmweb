import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ROUTES } from '../consts';
import { MyPatients } from '../pages/MyPatients';
import { PatientExams } from '../pages/PatientExams';
import { SignUp } from '../pages/SignUp';
import { Route } from './Route';

export const Routes = () => {
	return <BrowserRouter>
		<Switch>
			<Route exact isPrivate={false} path={ROUTES.SIGNUP} component={SignUp} />
			<Route exact isPrivate path={ROUTES.HOME} component={MyPatients} />
			<Route exact isPrivate path={ROUTES.PATIENT_EXAMS} component={PatientExams} />
		</Switch>
	</BrowserRouter>;
};