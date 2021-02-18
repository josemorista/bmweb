import React, { useEffect, useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import { useExam } from '../../../hooks/useExam';


export const ResumeSegmentation: React.FC = () => {

	const { api } = useApi();
	const { exam, revalidateExam } = useExam();
	const [updateImgPixel, setUpdateImgPixel] = useState(0);

	useEffect(() => {
		api.post(`/exams/learning/${exam.id}/extractDetections`).then(() => {
			revalidateExam().then(() => {
				setUpdateImgPixel(value => (value + 1));
			});
		});
	}, [api, exam.id, revalidateExam]);


	return <>
		<div className='processed-result-container'>
			{exam.resumeSegmentationImgLocationURL && <img src={`${exam.resumeSegmentationImgLocationURL}?version=${updateImgPixel}`} alt='segmented' />}
		</div>
	</>;
};