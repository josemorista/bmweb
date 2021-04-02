import React, { useEffect, useState } from 'react';
import { Button } from '../../../design/Button';
import { useApi } from '../../../hooks/useApi';
import { useExam } from '../../../hooks/useExam';

interface IResumeSegmentationProps {
	goNext(): void;
}

export const ResumeSegmentation: React.FC<IResumeSegmentationProps> = ({ goNext }) => {

	const { api } = useApi();
	const { exam, revalidateExam } = useExam();
	const [updateImgPixel, setUpdateImgPixel] = useState(0);

	useEffect(() => {
		if (exam.currentStep !== 'resume' && exam.currentStep !== 'classify') {
			api.post(`/exams/learning/${exam.id}/extractDetections`).then(() => {
				revalidateExam().then(() => {
					setUpdateImgPixel(value => (value + 1));
				});
			});
		}
	}, [api, exam.id, revalidateExam, exam.currentStep]);


	return <>
		<div className='processed-result-container'>
			{exam.resumeSegmentationImgLocationURL && <img src={`${exam.resumeSegmentationImgLocationURL}?version=${updateImgPixel}`} alt='segmented' />}
		</div>
		<div className='go-next-button'>
			<Button variant='primary' onClick={() => {
				goNext();
			}}>Avançar</Button>
		</div>
	</>;
};