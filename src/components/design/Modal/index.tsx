import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { ModalContainer } from './styles';
import { AiFillCloseCircle } from 'react-icons/ai';

interface IModalProps {
	initialState?: boolean;
	isOpen?: boolean;
	children?: React.ReactNode;
	onCloseCircleClick?(isOpen: boolean): void;
	disableControls?: boolean;
}

export interface IModalHandle {
	setOpen(status: boolean): void;
	open: boolean;
}

export const Modal = forwardRef<IModalHandle, IModalProps>(({ children, initialState, isOpen, onCloseCircleClick, disableControls }, ref) => {

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
			<div className='modal-close-icon'>
				<AiFillCloseCircle size={30} onClick={() => {
					if (onCloseCircleClick) {
						onCloseCircleClick(open);
					}
					if (isOpen === undefined && !disableControls) {
						setOpen(false);
					}
				}} />
			</div>
			{children}
		</main>
	</ModalContainer>);
});