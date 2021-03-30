import { IExamDetectionClassification } from './IExamDetectionClassification';

export interface IExamDetection {
	id: string;
	examId: string;
	automaticClassificationId: string | null;
	revisedClassificationId: string | null;
	area: number;
	aspectRatio: number;
	perimeter: number;
	centroidX: number;
	centroidY: number;
	equivalentDiameter: number;
	extent: number;
	meanIntensity: number;
	orientation: number;
	eccentricity: number;
	bboxX0: number;
	bboxX1: number;
	bboxY0: number;
	bboxY1: number;
	automaticClassification: IExamDetectionClassification | null;
	revisedClassification: IExamDetectionClassification | null;
	createdAt: Date;
	updatedAt: Date;
}