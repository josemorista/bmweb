export interface IExam {
	id: string;
	patientId: string;
	category: 'ant' | 'post' | 'cra';
	label: string;
	createdAt: Date;
}