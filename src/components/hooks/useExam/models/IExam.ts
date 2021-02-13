export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';
	patientId: string;
	maxDicomValue: number;
	currentStep: number;
	denoiseFilter: 'median' | null;
	histogramEqualization: 'adaptative' | null;
	edgeFilter: 'roberts' | 'sobel' | 'prewitt' | 'scharr' | null;
	segmentationMethod: 'otsu' | 'randomWalker' | null;
	processedImgLocation: string;
	originalImgLocation: string;
	originalImgLocationURL: string;
	processedImgLocationURL: string;
	dicomFileLocation: string;
	createdAt: Date;
	updatedAt: Date;
}