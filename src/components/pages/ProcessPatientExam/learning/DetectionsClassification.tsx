import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '../../../design/Button';
import { useApi } from '../../../hooks/useApi';
import { useExam } from '../../../hooks/useExam';
import { IExamDetection } from '../../../hooks/useExam/models/IExamDetection';
import { DetectionsClassificationContainer } from '../styles';

export const DetectionsClassifications: FC = () => {
	const { api } = useApi();
	const { exam, revalidateExam } = useExam();
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const img2Ref = useRef<HTMLImageElement>(null);
	const [selectedDetection, setSelectedDetection] = useState<IExamDetection | null>(null);
	const examDetections = useMemo(() => {
		return {
			totalArea: exam.examDetections.reduce((acum, detection) => detection.area + acum, 0),
			qnt: exam.examDetections.length,
			detections: exam.examDetections.sort((a, b) => b.area - a.area)
				.map(el => ({ ...el, centroidX: Math.round(el.centroidX), centroidY: Math.round(el.centroidY) }))
		};
	}, [exam.examDetections]);

	useEffect(() => {
		api.post(`/exams/learning/${exam.id}/classify`).then(() => {
			revalidateExam();
		});
	}, [api, exam.id, revalidateExam]);

	const drawExamDetectionBbox = ([x0, y1, width, height]: Array<number>) => {
		if (canvasRef.current) {
			const ctx = canvasRef.current?.getContext('2d');
			ctx?.clearRect(0, 0, canvasRef.current?.width, canvasRef.current.height);
			imgRef.current && (ctx?.drawImage(imgRef.current, 0, 0));
			ctx && (ctx.lineWidth = 3);
			ctx && (ctx.strokeStyle = '#0F62AC');
			ctx?.beginPath();
			ctx?.rect(x0, y1, width, height);
			ctx?.stroke();
		}
	};

	useEffect(() => {
		if (selectedDetection) {
			drawExamDetectionBbox([
				selectedDetection.bboxX0,
				selectedDetection.bboxY1,
				(selectedDetection.bboxX1 - selectedDetection.bboxX0),
				(selectedDetection.bboxY0 - selectedDetection.bboxY1)
			]);
		}
	}, [selectedDetection]);

	return <DetectionsClassificationContainer>
		<section>
			<h3>Área total: {examDetections.totalArea}</h3>
			<h3>Quantidade: {examDetections.qnt} </h3>
			<ul>
				{examDetections.detections.map(detection => (
					<li key={detection.id}
						className={selectedDetection?.id !== detection.id ? 'inactive' : ''}
						onClick={() => {
							setSelectedDetection(detection);
						}}>
						<h4>{detection.revisedClassification?.name || detection.automaticClassification?.name}</h4>
						{selectedDetection?.id === detection.id &&
							<div className="details">
								<p><strong>Área:</strong> {detection.area}mm²</p>
								<p><strong>Perímetro:</strong> {detection.perimeter}mm</p>
								<p><strong>Posição:</strong> ({detection.centroidX}, {detection.centroidY})</p>
								<p><strong>Proporção:</strong> {detection.aspectRatio}</p>
								<p><strong>Excentricidade:</strong> {detection.eccentricity}</p>
								<p><strong>Extensão relativa:</strong> {detection.extent}</p>
								<section className="details-buttons">
									<Button variant='error'>Excluir</Button>
								</section>
							</div>
						}
					</li>
				))}
			</ul>
		</section>
		<section>
			<img style={{ display: 'none' }} ref={imgRef} src={exam.originalImgLocationURL || ''} alt='' />
			<img style={{ display: 'none' }} ref={img2Ref} src={exam.edgedImgLocationURL || ''} alt='' />
			<canvas ref={canvasRef} width={imgRef.current?.width} height={imgRef.current?.height}></canvas>;
		</section>
	</DetectionsClassificationContainer>;
};