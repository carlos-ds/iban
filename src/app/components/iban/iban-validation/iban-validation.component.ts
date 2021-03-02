import { Component, OnInit } from '@angular/core';
import { IbanService } from 'src/app/services/iban.service';
import { ValidationResult } from '../../../models/iban.model';
import { LengthExcludingWhitespacePipe } from '../../../pipes/length-excluding-whitespaces.pipe';

@Component({
  selector: 'iban-validation',
  templateUrl: './iban-validation.component.html',
  styleUrls: ['./iban-validation.component.scss'],
})
export class IbanValidationComponent implements OnInit {
  accountNumberToValidate: string;
  validationResult: ValidationResult;

  constructor(private ibanService: IbanService) {
    this.accountNumberToValidate = '';
    this.validationResult = {} as ValidationResult;
  }

  handleChange(event: any) {
    this.ibanService
      .validateIban({ accountNumber: event.target.value })
      .subscribe((data) => {
        this.validationResult = Object.assign({}, data);
      });
  }

  ngOnInit(): void {}
}
