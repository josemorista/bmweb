import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../../../design/Button';
import { useApi } from '../../../../hooks/useApi';
import { useExam } from '../../../../hooks/useExam';


interface IClipAndConvertToImg {
	goNext(): void;
}


export const ClipAndConvertToImg: React.FC<IClipAndConvertToImg> = ({ goNext }) => {

	const { api } = useApi();
	const { exam, revalidateExam } = useExam();
	const [updateImgPixel, setUpdateImgPixel] = useState(0);


	const reprocessImageWithConvertOptions = useCallback(async () => {
		await api.post(`exams/preProcessing/${exam.id}/clipAndConvertToImage`);
		if (!exam.originalImgLocationURL) {
			await revalidateExam();
		} else {
			setUpdateImgPixel(value => (value + 1));
		}
	}, [api, exam.id, exam.originalImgLocationURL, revalidateExam]);

	useEffect(() => {
		reprocessImageWithConvertOptions();
	}, [reprocessImageWithConvertOptions]);

	return <>
		<div className='processed-result-container'>
			{exam.originalImgLocationURL && <img src={`${exam.originalImgLocationURL}?update=${updateImgPixel}`} alt='' />}
		</div>

		{exam.originalImgLocationURL && <div className='go-next-button'>
			<Button variant='primary' onClick={() => {
				goNext();
			}}>Avançar</Button>
		</div>}
	</>;
};