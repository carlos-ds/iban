import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IbanService } from 'src/app/services/iban.service';
import { ValidationResult } from '../../../models/iban.model';

@Component({
  selector: 'iban-validation',
  templateUrl: './iban-validation.component.html',
  styleUrls: ['./iban-validation.component.scss'],
})
export class IbanValidationComponent implements OnInit {
  showValidationResult: boolean;
  accountNumberToValidate: string;
  validationResult: ValidationResult;

  constructor(private ibanService: IbanService) {
    this.accountNumberToValidate = '';
    this.showValidationResult = true;
    this.validationResult = {} as ValidationResult;
  }

  handleChange(event: any) {
    const accountNumber = event.target.value;

    if (this.accountNumberToValidate.substr(0, 2) === 'BE') {
      this.validationResult.startsWithBelgianPrefix = true;
    }
    if (this.accountNumberToValidate.length === 16) {
      this.validationResult.has16Characters = true;
    }
  }

  onFocus() {
    this.showValidationResult = true;
  }

  onFocusOut() {
    if (this.accountNumberToValidate.length === 0) {
      this.showValidationResult = false;
    }
  }

  ngOnInit(): void {}
}
