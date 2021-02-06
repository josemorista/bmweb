import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ModalContainer } from './styles';

interface IModalProps {
	initialState?: boolean;
	isOpen?: boolean;
	children?: React.ReactNode;
}

export interface IModalHandle {
	setOpen(status: boolean): void;
	open: boolean;
}

export const Modal = forwardRef<IModalHandle, IModalProps>(({ children, initialState, isOpen }, ref) => {

	const [open, setOpen] = useState(initialState || false);

	useEffect(() => {
		if (isOpen !== undefined) {
			setOpen(isOpen);
		}
	}, [isOpen]);

	useImperativeHandle(ref, () => ({
		setOpen,
		open
	}));

	if (!open) {
		return null;
	}

	return (<ModalContainer>
		<main className='modal-body'>
			{children}
		</main>
	</ModalContainer>);
});