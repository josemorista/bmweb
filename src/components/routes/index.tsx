import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ROUTES } from '../consts';
import { MyPatients } from '../pages/MyPatients';
import { SignUp } from '../pages/SignUp';
import { Route } from './Route';

export const Routes = () => {
	return <BrowserRouter>
		<Switch>
			<Route isPrivate={false} path={ROUTES.SIGNUP} component={SignUp} />
			<Route isPrivate path={ROUTES.HOME} component={MyPatients} />
		</Switch>
	</BrowserRouter>;
};