import { IExamDetection } from './IExamDetection';

export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';
	currentStep: 'initial' | 'convertAndClip' | 'denoise' | 'segment' | 'edging' | 'resume' | 'classify';
	patientId: string;

	denoisedImgLocationURL: string | null;
	segmentedImgLocationURL: string | null;
	edgedImgLocationURL: string | null;
	originalImgLocationURL: string | null;
	resumeSegmentationImgLocationURL: string | null;
	dicomFileLocation: string;

	examDetections: Array<IExamDetection>;

	createdAt: Date;
	updatedAt: Date;
}