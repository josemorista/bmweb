import React, { useCallback, useMemo, useState } from 'react';
import { useExam } from '../../hooks/useExam';
import { AppBar } from '../../partials/AppBar';
import { DetectionsClassifications } from './learning/DetectionsClassification';
import { ResumeSegmentation } from './learning/ResumeSegmentation';
import { ApplyEdgeFilter } from './preProcessing/ApplyEdgeFilter';
import { ApplyImgSegmentation } from './preProcessing/ApplySegmentation';
import { ClipAndConvertToImg } from './preProcessing/ClipAndConvertToImg';
import { DenoiseImg } from './preProcessing/DenoiseImg';
import { ProcessPatientExamContainer } from './styles';

const currentStepsLabels = [
	'Transformação linear',
	'Remoção de ruídos',
	'Segmentação',
	'Filtros de contorno',
	'Resumo da detecção',
	'Classificação de detecções'
];

export const ProcessPatientExam: React.FC = () => {

	const { exam } = useExam();
	const [currentStep, setCurrentStep] = useState(0);

	const goNext = useCallback(() => {
		setCurrentStep(value => value + 1);
	}, []);

	const avaiableSteps = useMemo(() => [
		<ClipAndConvertToImg goNext={goNext} key={'cp'}></ClipAndConvertToImg>,
		<DenoiseImg goNext={goNext} key={'dn'}></DenoiseImg>,
		<ApplyImgSegmentation goNext={goNext} key={'sg'}></ApplyImgSegmentation>,
		<ApplyEdgeFilter goNext={goNext} key={'ed'}></ApplyEdgeFilter>,
		<ResumeSegmentation key={'res'} goNext={goNext}></ResumeSegmentation>,
		<DetectionsClassifications key={'cla'}></DetectionsClassifications>
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