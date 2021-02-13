import React, { useCallback, useRef, useState } from 'react';
import { Input } from '../../design/Input';
import { useApi } from '../../hooks/useApi';
import { useExam } from '../../hooks/useExam';
import { useForm } from '../../hooks/useForm';
import { AppBar } from '../../partials/AppBar';
import { ProcessPatientExamContainer } from './styles';

const currentStepsLabels = [
	'Limiares de segmentação'
];

const maxRange = 1000;
const step = 50;


export const ProcessPatientExam: React.FC = () => {

	const { exam } = useExam();
	const { api } = useApi();
	const [currentStep, setCurrentStep] = useState(exam.currentStep);
	const [updateImgPixel, setUpdateImgPixel] = useState(0);

	const { data: convertOptions, onInputChange } = useForm({
		initialState: {
			maxDicomValue: exam.maxDicomValue
		}
	});

	const reprocessImageWithConvertOptions = useCallback(async () => {

		await api.post(`exams/preProcessing/${exam.id}/clipAndConvertToImage`, convertOptions);
		setUpdateImgPixel(value => (value + 1));
	}, [api, convertOptions, exam]);

	return <ProcessPatientExamContainer>
		<AppBar />
		<main>
			<h1>Processando exame: {exam.label}</h1>
			<h2>O estado atual é : <span>{currentStepsLabels[currentStep]}</span></h2>
			<h4>Selecione o limiar máximo para conversão do arquivo Dicom:</h4>
			<p>Obs: O estabelecimento deste limiar ocasiona na remoção de outliers na transformação linear dos valores do exame para o intervalo real de 0 a 1.</p>
			<Input list="tickmarks" width='60rem' type="range" value={convertOptions.maxDicomValue} name='maxDicomValue' onChange={onInputChange} min="1" max={maxRange} onMouseUpCapture={() => {
				reprocessImageWithConvertOptions();
			}}></Input>
			<datalist id="tickmarks">
				<option value="1" label="1" />
				{[...new Array((maxRange / step))].map((_, index) => index !== 0 && <option key={index} value={index * step} label={`${index * step}`} />)}
			</datalist>
			<div className='processed-result-container'>
				<img src={`${exam.originalImgLocationURL}?update=${updateImgPixel}`} alt='' />
			</div>
		</main>
	</ProcessPatientExamContainer>;
};