import React from 'react';
import { Route as DomRoute, RouteProps } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { MyPatients } from '../pages/MyPatients';
import { SignIn } from '../pages/SignIn';

interface IRouteProps extends RouteProps {
	isPrivate: boolean;
}

export const Route: React.FC<IRouteProps> = ({ isPrivate, ...rest }) => {
	const { signed } = useAuth();

	if (isPrivate && !signed) {
		return <DomRoute {...rest} component={SignIn} />;
	}

	if (!isPrivate && signed) {
		return <DomRoute {...rest} component={MyPatients} />;
	}

	return <DomRoute {...rest} />;
};