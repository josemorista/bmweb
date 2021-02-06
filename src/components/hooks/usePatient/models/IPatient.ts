export interface IPatient {
	id: string;
	name: string;
	birthDate: Date;
	sex: string;
	previousBoneLesions: boolean;
	previousBoneLesionsLocations?: Array<string>;
	previousQt: boolean;
	previousRt: boolean;
	currentOnQt: boolean;
	currentOnRt: boolean;
	previousCancerDiagnosis: boolean;
	previousCancerDiagnosisType?: string;
	observations: string;
}