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
	},
	{
		label: 'Roberts',
		value: 'roberts'
	}
];

interface IApplyEdgeFilterProps {
	goNext(): void;
}

export const ApplyEdgeFilter: React.FC<IApplyEdgeFilterProps> = ({ goNext }) => {

	const { api } = useApi();
	const { exam, revalidateExam } = useExam();

	const [updateImgPixel, setUpdateImgPixel] = useState(0);
	const { data: edgeFilterOptions, onSelectChange } = useForm({
		initialState: {
			method: 'sobel'
		}
	});

	const reprocessWithEdgeFilterMethod = useCallback(async () => {
		await api.patch(`exams/preProcessing/${exam.id}/applyEdgeFilter`, edgeFilterOptions);
		if (!exam.edgedImgLocationURL) {
			await revalidateExam();
		} else {
			setUpdateImgPixel(value => (value + 1));
		}
	}, [api, edgeFilterOptions, exam.id, exam.edgedImgLocationURL, revalidateExam]);

	return <>
		<h4 style={{ marginBottom: '2rem' }}>Selecione o filtro de aplicação para realce e futura detecção dos contornos das metástases na imagem:</h4>
		<Select width='40rem' onChange={onSelectChange} name='method' options={edgeFilterMethodOptions}></Select>
		<Button variant='primary' onClick={() => {
			reprocessWithEdgeFilterMethod();
		}}>Reprocessar</Button>
		<div className='processed-result-container'>
			{exam.segmentedImgLocationURL && <img src={exam.segmentedImgLocationURL} alt='segmented' />}
			{exam.edgedImgLocationURL && <img src={`${exam.edgedImgLocationURL}?update=${updateImgPixel}`} alt='processed' />}
		</div>
		<div className='go-next-button'>
			<Button variant='primary' onClick={() => {
				goNext();
			}}>Avançar</Button>
		</div>
	</>;
};