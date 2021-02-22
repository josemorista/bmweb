import React, { useCallback, useState } from 'react';
import { Button } from '../../../../design/Button';
import { Input } from '../../../../design/Input';
import { Select } from '../../../../design/Select';
import { useApi } from '../../../../hooks/useApi';
import { useExam } from '../../../../hooks/useExam';
import { useForm } from '../../../../hooks/useForm';

const segmentImgMethodOptions = [
	{
		label: 'Otsu multinível',
		value: 'otsu'
	},
	{
		label: 'Caminhante aleatório',
		value: 'randomWalker'
	},
	{
		label: 'Otsu local',
		value: 'localOtsu'
	}
];

const cumulativeOptions = [
	{
		label: 'Sim',
		value: true
	},
	{
		label: 'Não',
		value: false
	}
];

interface IApplyImgSegmentationProps {
	goNext(): void;
}

export const ApplyImgSegmentation: React.FC<IApplyImgSegmentationProps> = ({ goNext }) => {

	const { api } = useApi();
	const { exam, revalidateExam } = useExam();
	const [updateImgPixel, setUpdateImgPixel] = useState(0);
	const { data: applyImgSegmentationOptions, onSelectChange, onInputChange } = useForm({
		initialState: {
			method: 'otsu',
			randomWalkerParamsMarker0: 0.2,
			randomWalkerParamsMarker1: 0.5,
			cumulative: false,
			localOtsuDiskSize: 15
		}
	});

	const reprocessWithImgSegmentationMethod = useCallback(async () => {
		await api.patch(`exams/preProcessing/${exam.id}/applySegmentation`, {
			method: applyImgSegmentationOptions.method,
			cumulative: applyImgSegmentationOptions.cumulative,
			localOtsuParams: {
				diskSize: applyImgSegmentationOptions.localOtsuDiskSize
			},
			randomWalkerParams: {
				markers: [
					applyImgSegmentationOptions.randomWalkerParamsMarker0,
					applyImgSegmentationOptions.randomWalkerParamsMarker1
				]
			}
		});
		if (!exam.segmentedImgLocationURL) {
			await revalidateExam();
		} else {
			setUpdateImgPixel(value => (value + 1));
		}
	}, [api, applyImgSegmentationOptions, exam.id, exam.segmentedImgLocationURL, revalidateExam]);

	return <>
		<h4 style={{ marginBottom: '2rem' }}>Selecione o método desejado para realizar a segmentação de áreas de intensidade intensiva:</h4>
		<p>Nesta etapa serão considerados valores de corte no histograma das intensidades tons de cinza imagem que melhor a segmentam.</p>
		<br />
		<Select label='Método' width='40rem' onChange={onSelectChange} value={applyImgSegmentationOptions.method} name='method' options={segmentImgMethodOptions}></Select>
		<Select label='Cumulativo?' width='10rem' onChange={onSelectChange} value={applyImgSegmentationOptions.cumulative} name='cumulative' options={cumulativeOptions}></Select>
		{applyImgSegmentationOptions.method === 'randomWalker' && <div className='random-marker-params-container'>
			<div>
				<br />
				<Input step={0.1} label='Marcador minímo para atividade intensiva' width='100px' type='number' name='randomWalkerParamsMarker1' value={applyImgSegmentationOptions.randomWalkerParamsMarker1} onChange={onInputChange} />
			</div>
			<div className='histogram-container'>
				<section>
					<p>Histograma de atividade pós equalização:</p>
					<img src={exam.equalizedImgHistogramLocationURL} alt='histograma' />
				</section>
			</div>
			<br />
		</div>}
		{
			applyImgSegmentationOptions.method === 'localOtsu' && <div>
				<br />
				<Input step={1} label='Tamanho do disco' width='100px' type='number' name='localOtsuDiskSize' value={applyImgSegmentationOptions.localOtsuDiskSize} onChange={onInputChange} />
			</div>
		}
		<Button variant='primary' onClick={() => {
			reprocessWithImgSegmentationMethod();
		}}>Reprocessar</Button>
		<div className='processed-result-container'>
			{exam.equalizedImgLocationURL && <img src={exam.equalizedImgLocationURL} alt='equalized' />}
			{exam.segmentedImgLocationURL && <img src={`${exam.segmentedImgLocationURL}?update=${updateImgPixel}`} alt='processed' />}
		</div>
		{exam.segmentedImgLocationURL && <div className='go-next-button'>
			<Button variant='primary' onClick={() => {
				goNext();
			}}>Avançar</Button>
		</div>}
	</>;
};