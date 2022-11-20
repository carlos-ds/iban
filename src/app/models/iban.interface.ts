export interface Iban {
  id: number;
  accountNumber: string;
  createdAt: string;
  createdBy: 'MANUAL' | 'GENERATE';
}

export interface ValidationResult {
  iban: string;
  has16Characters: boolean;
  startsWithBelgianPrefix: boolean;
  endsWithNumbers: boolean;
  hasValidBbanChecksum: boolean;
  hasValidIbanChecksum: boolean;
}
