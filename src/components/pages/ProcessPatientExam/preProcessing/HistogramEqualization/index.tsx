import React, { useCallback, useState } from 'react';
import { Button } from '../../../../design/Button';
import { Select } from '../../../../design/Select';
import { useApi } from '../../../../hooks/useApi';
import { useExam } from '../../../../hooks/useExam';
import { useForm } from '../../../../hooks/useForm';

const equalizeHistogramMethodOptions = [
	{
		label: 'Equalização adaptativa',
		value: 'adapthist'
	}
];

interface IHistogramEqualizationProps {
	goNext(): void;
}

export const HistogramEqualization: React.FC<IHistogramEqualizationProps> = ({ goNext }) => {

	const { api } = useApi();
	const { exam, revalidateExam } = useExam();

	const [updateImgPixel, setUpdateImgPixel] = useState(0);
	const { data: equalizeHistogramOptions, onSelectChange } = useForm({
		initialState: {
			method: 'adapthist'
		}
	});

	const reprocessWithEqualizeHistogramMethod = useCallback(async () => {
		await api.patch(`exams/preProcessing/${exam.id}/applyHistogramEqualization`, equalizeHistogramOptions);
		await api.post(`exams/preProcession/${exam.id}/calculateHistograms`, {
			processHistogramFrom: 'equalized'
		});
		if (!exam.equalizedImgLocationURL) {
			await revalidateExam();
		} else {
			setUpdateImgPixel(value => (value + 1));
		}
	}, [api, equalizeHistogramOptions, exam.id, exam.equalizedImgLocationURL, revalidateExam]);

	return <>
		<h4 style={{ marginBottom: '2rem' }}>Selecione o método desejado para equalização do histograma:</h4>
		<Select width='40rem' onChange={onSelectChange} name='method' options={equalizeHistogramMethodOptions}></Select>
		<div className='histogram-container'>
			<section>
				<p>Histograma de atividade:</p>
				<img src={exam.originalImgHistogramLocationURL} alt='histograma' />
			</section>
			<section>
				<p>Histograma pós-equalização:</p>
				<img src={`${exam.equalizedImgHistogramLocationURL}?update=${updateImgPixel}`} alt='histograma' />
			</section>
		</div>
		<Button variant='primary' onClick={() => {
			reprocessWithEqualizeHistogramMethod();
		}}>Reprocessar</Button>
		<div className='processed-result-container'>
			{exam.denoisedImgLocationURL && <img src={exam.denoisedImgLocationURL} alt='original' />}
			{exam.equalizedImgLocationURL && <img src={`${exam.equalizedImgLocationURL}?update=${updateImgPixel}`} alt='processed' />}
		</div>
		<div className='go-next-button'>
			<Button variant='primary' onClick={() => {
				goNext();
			}}>Avançar</Button>
		</div>
	</>;
};