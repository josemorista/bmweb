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
	const { exam } = useExam();

	const [updateImgPixel, setUpdateImgPixel] = useState(Math.round(Math.random() * 100));
	const { data: equalizeHistogramOptions, onSelectChange } = useForm({
		initialState: {
			method: 'adapthist'
		}
	});

	const reprocessWithEqualizeHistogramMethod = useCallback(async () => {
		await api.patch(`exams/preProcessing/${exam.id}/applyHistogramEqualization`, equalizeHistogramOptions);
		setUpdateImgPixel(value => (value + 1));
	}, [api, equalizeHistogramOptions, exam]);

	return <>
		<h4 style={{ marginBottom: '2rem' }}>Selecione o método desejado para equalização do histograma:</h4>
		<Select width='40rem' onChange={onSelectChange} name='method' options={equalizeHistogramMethodOptions}></Select>
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