import React, { useCallback, useState } from 'react';
import { Button } from '../../../../design/Button';
import { Select } from '../../../../design/Select';
import { useApi } from '../../../../hooks/useApi';
import { useExam } from '../../../../hooks/useExam';
import { useForm } from '../../../../hooks/useForm';

const segmentImgMethodOptions = [
	{
		label: 'Otsu multinível',
		value: 'otsu'
	}
];

interface IApplyImgSegmentationProps {
	goNext(): void;
}

export const ApplyImgSegmentation: React.FC<IApplyImgSegmentationProps> = ({ goNext }) => {

	const { api } = useApi();
	const { exam } = useExam();

	const [updateImgPixel, setUpdateImgPixel] = useState(0);
	const { data: applyImgSegmentationOptions, onSelectChange } = useForm({
		initialState: {
			method: 'otsu'
		}
	});

	const reprocessWithImgSegmentationMethod = useCallback(async () => {
		await api.patch(`exams/preProcessing/${exam.id}/applySegmentation`, applyImgSegmentationOptions);
		setUpdateImgPixel(value => (value + 1));
	}, [api, applyImgSegmentationOptions, exam]);

	return <>
		<h4 style={{ marginBottom: '2rem' }}>Selecione o método desejado para realizar a segmentação de áreas de intensidade intensiva:</h4>
		<p>Nesta etapa serão considerados valores de corte no histograma das intensidades tons de cinza imagem que melhor a segmentam.</p>
		<br />
		<Select width='40rem' onChange={onSelectChange} name='method' options={segmentImgMethodOptions}></Select>
		<Button variant='primary' onClick={() => {
			reprocessWithImgSegmentationMethod();
		}}>Reprocessar</Button>
		<div className='processed-result-container'>
			{exam.equalizedImgLocationURL && <img src={exam.equalizedImgLocationURL} alt='equalized' />}
			{exam.segmentedImgLocationURL && <img src={`${exam.segmentedImgLocationURL}?update=${updateImgPixel}`} alt='processed' />}
		</div>
		<div className='go-next-button'>
			<Button variant='primary' onClick={() => {
				goNext();
			}}>Avançar</Button>
		</div>
	</>;
};