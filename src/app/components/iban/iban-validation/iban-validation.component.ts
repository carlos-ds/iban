import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IbanService } from 'src/app/services/iban.service';
import { ValidationResult } from '../../../models/iban.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'iban-validation',
  templateUrl: './iban-validation.component.html',
  styleUrls: ['./iban-validation.component.scss'],
})
export class IbanValidationComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  accountNumber = new FormControl('');
  validationResult: ValidationResult;

  constructor(private ibanService: IbanService) {
    this.validateIbanOnChange();
  }

  ngOnInit(): void {
    this.validationResult = {} as ValidationResult;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  validateIbanOnChange() {
    this.accountNumber.valueChanges
      .pipe(debounceTime(500), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.ibanService
          .validateIban({ accountNumber: value })
          .subscribe((data) => {
            this.validationResult = Object.assign({}, data);
          });
      });
  }
}
