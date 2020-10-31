export interface Iban {
  id: number;
  value: string;
  format: string;
  country: string;
}

export interface ValidationResult {
  iban: string;
  has16Characters: boolean;
  startsWithBelgianPrefix: boolean;
  endsWithNumbers: boolean;
  hasValidBbanChecksum: boolean;
}
