import React, { useCallback, useState } from 'react';
import { Button } from '../../../../design/Button';
import { Select } from '../../../../design/Select';
import { useApi } from '../../../../hooks/useApi';
import { useExam } from '../../../../hooks/useExam';
import { useForm } from '../../../../hooks/useForm';

const denoiseMethodOptions = [
	{
		label: 'Filtro de mediana',
		value: 'median'
	}
];

interface IDenoiseImgProps {
	goNext(): void;
}

export const DenoiseImg: React.FC<IDenoiseImgProps> = ({ goNext }) => {

	const { api } = useApi();
	const { exam, revalidateExam } = useExam();

	const [updateImgPixel, setUpdateImgPixel] = useState(0);
	const { data: denoiseOptions, onSelectChange } = useForm({
		initialState: {
			method: 'median'
		}
	});

	const reprocessWithDenoiseMethod = useCallback(async () => {
		await api.patch(`exams/preProcessing/${exam.id}/applyDenoiseFilter`, denoiseOptions);
		if (!exam.denoisedImgLocationURL) {
			await revalidateExam();
		} else {
			setUpdateImgPixel(value => (value + 1));
		}
	}, [api, denoiseOptions, exam.id, exam.denoisedImgLocationURL, revalidateExam]);

	return <>
		<h4 style={{ marginBottom: '2rem' }}>Selecione o método desejado para remoção de ruídos da imagem:</h4>
		<Select width='40rem' onChange={onSelectChange} value={denoiseOptions.method} name='method' options={denoiseMethodOptions}></Select>
		<Button variant='primary' onClick={() => {
			reprocessWithDenoiseMethod();
		}}>Reprocessar</Button>
		<div className='processed-result-container'>
			{exam.originalImgLocationURL && <img src={exam.originalImgLocationURL} alt='original' />}
			{exam.denoisedImgLocationURL && <img src={`${exam.denoisedImgLocationURL}?update=${updateImgPixel}`} alt='processed' />}
		</div>
		{exam.denoisedImgLocationURL && <div className='go-next-button'>
			<Button variant='primary' onClick={() => {
				goNext();
			}}>Avançar</Button>
		</div>}
	</>;
};