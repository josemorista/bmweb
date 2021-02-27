export interface IExam {
	id: string;
	label: string;
	category: 'ant' | 'post' | 'cra';
	patientId: string;
	denoisedImgLocation: string | null;
	denoisedImgLocationURL: string | null;
	equalizedImgLocation: string | null;
	segmentedImgLocation: string | null;
	resumeSegmentationImgLocation: string | null;
	segmentedImgLocationURL: string | null;
	edgedImgLocation: string | null;
	edgedImgLocationURL: string | null;
	originalImgLocation: string | null;
	originalImgLocationURL: string | null;
	resumeSegmentationImgLocationURL: string | null;
	dicomFileLocation: string;
	createdAt: Date;
	updatedAt: Date;
}