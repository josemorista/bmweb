import React, { useCallback, useState } from 'react';
import { Button } from '../../../../design/Button';
import { Select } from '../../../../design/Select';
import { useApi } from '../../../../hooks/useApi';
import { useExam } from '../../../../hooks/useExam';
import { useForm } from '../../../../hooks/useForm';

const edgeFilterMethodOptions = [
	{
		label: 'Sobel',
		value: 'sobel'
	}
];

interface IApplyEdgeFilterProps {
	goNext(): void;
}

export const ApplyEdgeFilter: React.FC<IApplyEdgeFilterProps> = ({ goNext }) => {

	const { api } = useApi();
	const { exam } = useExam();

	const [updateImgPixel, setUpdateImgPixel] = useState(Math.round(Math.random() * 100));
	const { data: edgeFilterOptions, onSelectChange } = useForm({
		initialState: {
			method: 'sobel'
		}
	});

	const reprocessWithEdgeFilterMethod = useCallback(async () => {
		await api.patch(`exams/preProcessing/${exam.id}/applyEdgeFilter`, edgeFilterOptions);
		setUpdateImgPixel(value => (value + 1));
	}, [api, edgeFilterOptions, exam]);

	return <>
		<h4 style={{ marginBottom: '2rem' }}>Selecione o filtro de aplicação para realce e futura detecção dos contornos das metástases na imagem:</h4>
		<Select width='40rem' onChange={onSelectChange} name='method' options={edgeFilterMethodOptions}></Select>
		<Button variant='primary' onClick={() => {
			reprocessWithEdgeFilterMethod();
		}}>Reprocessar</Button>
		<div className='processed-result-container'>
			<img src={exam.originalImgLocationURL} alt='original' />
			<img src={`${exam.processedImgLocationURL}?update=${updateImgPixel}`} alt='processed' />
		</div>
		<div className='go-next-button'>
			<Button variant='primary' onClick={() => {
				goNext();
			}}>Avançar</Button>
		</div>
	</>;
};