import React, { useCallback, useMemo, useState } from 'react';
import { useExam } from '../../hooks/useExam';
import { AppBar } from '../../partials/AppBar';
import { ClipAndConvertToImg } from './preProcessing/ClipAndConvertToImg';
import { DenoiseImg } from './preProcessing/DenoiseImg';
import { ProcessPatientExamContainer } from './styles';

const currentStepsLabels = [
	'Limiares de segmentação',
	'Remoção de ruídos'
];

export const ProcessPatientExam: React.FC = () => {

	const { exam } = useExam();
	const [currentStep, setCurrentStep] = useState(exam.currentStep);

	const goNext = useCallback(() => {
		setCurrentStep(value => value + 1);
	}, []);

	const avaiableSteps = useMemo(() => [
		<ClipAndConvertToImg goNext={goNext} key={'cp'}></ClipAndConvertToImg>,
		<DenoiseImg goNext={goNext} key={'dn'}></DenoiseImg>
	], [goNext]);

	return <ProcessPatientExamContainer>
		<AppBar />
		<main>
			<h1>Processando exame: {exam.label}</h1>
			<h2>A etapa atual é : <span>{currentStepsLabels[currentStep]}</span></h2>
			{avaiableSteps[currentStep]}
		</main>
	</ProcessPatientExamContainer>;
};