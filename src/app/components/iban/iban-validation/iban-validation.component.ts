import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface ValidationResult {
  has16Characters: boolean;
  startsWithBelgianPrefix: boolean;
  endsWithNumbers: boolean;
  hasValidBbanChecksum: boolean;
  hasValidIbanChecksum: boolean;
}

@Component({
  selector: 'iban-validation',
  templateUrl: './iban-validation.component.html',
  styleUrls: ['./iban-validation.component.scss'],
})
export class IbanValidationComponent implements OnInit {
  showValidationResult: boolean;
  ibanToValidate: string;
  validationResult: ValidationResult;

  constructor() {
    this.ibanToValidate = '';
    this.showValidationResult = true;
    this.validationResult = {} as ValidationResult;
  }

  handleChange(event: any) {
    this.ibanToValidate = event.target.value;

    if (this.ibanToValidate.substr(0, 2) === 'BE') {
      this.validationResult.startsWithBelgianPrefix = true;
    }
    if (this.ibanToValidate.length === 16) {
      this.validationResult.has16Characters = true;
    }
  }

  onFocus() {
    this.showValidationResult = true;
  }

  onFocusOut() {
    if (this.ibanToValidate.length === 0) {
      this.showValidationResult = false;
    }
  }

  ngOnInit(): void {}
}
