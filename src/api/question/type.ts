export interface Question {
  type: string;
  postSubmit?: string;
  onLoad?: string;
  label: string;
  isRequired: boolean;
  validations: string[];
  isDeleted: boolean;
}
