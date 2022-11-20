import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IbanService } from 'src/app/services/iban.service';
import { ValidationResult } from '../../../models/iban.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-iban-validation',
  templateUrl: './iban-validation.component.html',
  styleUrls: ['./iban-validation.component.scss'],
})
export class IbanValidationComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  public accountNumber = new FormControl('');
  public validationResult: ValidationResult;

  constructor(private ibanService: IbanService) {
    this.validateIbanOnChange();
  }

  public ngOnInit(): void {
    this.validationResult = {} as ValidationResult;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public validateIbanOnChange(): void {
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
