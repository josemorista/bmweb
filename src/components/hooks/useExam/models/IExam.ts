export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';
	patientId: string;
	maxDicomValue: number;
	currentStep: number;
	denoiseFilter: 'median' | null;
	histogramEqualization: 'adapthist' | null;
	edgeFilter: 'roberts' | 'sobel' | 'prewitt' | 'scharr' | null;
	segmentationMethod: 'otsu' | 'randomWalker' | null;
	denoisedImgLocation: string | null;
	denoisedImgLocationURL: string | null;
	equalizedImgLocation: string | null;
	equalizedImgLocationURL: string | null;
	segmentedImgLocation: string | null;
	segmentedImgLocationURL: string | null;
	edgedImgLocation: string | null;
	edgedImgLocationURL: string | null;
	originalImgLocation: string | null;
	originalImgLocationURL: string | null;
	dicomFileLocation: string;
	createdAt: Date;
	updatedAt: Date;
}