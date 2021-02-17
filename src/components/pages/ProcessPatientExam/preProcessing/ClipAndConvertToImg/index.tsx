import React, { useCallback, useState } from 'react';
import { Button } from '../../../../design/Button';
import { Input } from '../../../../design/Input';
import { useApi } from '../../../../hooks/useApi';
import { useExam } from '../../../../hooks/useExam';
import { useForm } from '../../../../hooks/useForm';

const maxRange = 1000;
const step = 50;

interface IClipAndConvertToImg {
	goNext(): void;
}


export const ClipAndConvertToImg: React.FC<IClipAndConvertToImg> = ({ goNext }) => {

	const { api } = useApi();
	const { exam, revalidateExam } = useExam();
	const [updateImgPixel, setUpdateImgPixel] = useState(0);

	const { data: convertOptions, onInputChange } = useForm({
		initialState: {
			maxDicomValue: exam.maxDicomValue
		}
	});

	const reprocessImageWithConvertOptions = useCallback(async () => {
		await api.post(`exams/preProcessing/${exam.id}/clipAndConvertToImage`, convertOptions);
		if (!exam.originalImgLocationURL) {
			await revalidateExam();
		} else {
			setUpdateImgPixel(value => (value + 1));
		}
	}, [api, convertOptions, exam.id, exam.originalImgLocationURL, revalidateExam]);

	return <>
		<h4>Selecione o limiar máximo para conversão do arquivo Dicom:</h4>
		<p>Obs: O estabelecimento deste limiar ocasiona na remoção de outliers na transformação linear dos valores do exame para o intervalo real de 0 a 1.</p>
		<Input list="tickmarks" width='60rem' type="range" value={convertOptions.maxDicomValue} name='maxDicomValue' onChange={onInputChange} min="1" max={maxRange} ></Input>
		<datalist id="tickmarks">
			<option value="1" label="1" />
			{[...new Array((maxRange / step))].map((_, index) => index !== 0 && <option key={index} value={index * step} label={`${index * step}`} />)}
		</datalist>
		<Button variant='primary' onClick={() => {
			reprocessImageWithConvertOptions();
		}}>Reprocessar</Button>
		<div className='processed-result-container'>
			{exam.originalImgLocationURL && <img src={`${exam.originalImgLocationURL}?update=${updateImgPixel}`} alt='' />}
		</div>

		<div className='go-next-button'>
			<Button variant='primary' onClick={() => {
				goNext();
			}}>Avançar</Button>
		</div>
	</>;
};