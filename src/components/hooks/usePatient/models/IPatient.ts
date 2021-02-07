export interface IPatient {
	id: string;
	name: string;
	birthDate: Date;
	sex: 'M' | 'F';
	previousBoneLesions: boolean;
	previousBoneLesionsLocations?: Array<string>;
	previousQt: boolean;
	previousRt: boolean;
	previousCancerDiagnosis: boolean;
	previousCancerDiagnosisType?: string;
	observations: string;
}