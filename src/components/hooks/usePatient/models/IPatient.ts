export interface IPatient {
	id: string;
	name: string;
	birthDate: Date;
	sex: 'M' | 'F';
	previousBoneLesions: boolean | null;
	previousBoneLesionsLocations?: Array<string>;
	previousQt: boolean | null;
	previousRt: boolean | null;
	previousCancerDiagnosis: boolean | null;
	previousCancerDiagnosisType?: string;
	observations: string;
}