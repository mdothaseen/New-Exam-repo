
export enum FormStep {
  PersonalDetails = 0,
  ContactDetails = 1,
  Certification = 2,
}

export const stepTitles = [
  "Personal Details",
  "Contact Details",
  "Certification"
];

export interface AssessorFormData {
  // Personal Details
  name: string;
  sidhId: string;
  sidhPassword: string;
  dateOfBirth: Date | null;
  gender: string;
  category: string;
  religion: string;
  nationality: string;
  languages: string;
  photo: any;

  // Contact Details
  email: string;
  mobile: string;
  state: string;
  district: string;
  pinCode: string;
  address: string;

  // Certification (would be an array in a real app)
  certification: Array<{
    sector: string;
    jobRole: string;
    qpCode: string;
    version: string;
    type: string;
    sponsor: string;
    toaDate: Date | null;
    validityFrom: Date | null;
    validityTill: Date | null;
    certificate: any;
  }>;
}

export interface AssessorAddFormProps {
  onSubmit: (data: AssessorFormData) => void;
}
