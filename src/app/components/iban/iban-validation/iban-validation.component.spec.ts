import { ValidationResult } from '../../../models/iban.interface';
import { IbanValidationComponent } from './iban-validation.component';
import {render, RenderResult, screen} from '@testing-library/angular';
import { IbanService } from 'src/app/services/iban.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { LengthExcludingWhitespacePipe } from 'src/app/pipes/length-excluding-whitespaces.pipe';

const mockValidValidationResult: ValidationResult = {
  iban: 'BE62 6501 2926 5661',
  has16Characters: true,
  startsWithBelgianPrefix: true,
  endsWithNumbers: true,
  hasValidBbanChecksum: true,
  hasValidIbanChecksum: true,
};

const mockInvalidValidationResult: ValidationResult = {
  iban: 'BE30 0000 0000 1212',
  has16Characters: true,
  startsWithBelgianPrefix: true,
  endsWithNumbers: true,
  hasValidBbanChecksum: false,
  hasValidIbanChecksum: false,
};

describe('IbanValidationComponent', () => {
  async function setup(validationResult: ValidationResult): Promise<RenderResult<IbanValidationComponent, IbanValidationComponent>> {
    return await render(IbanValidationComponent, {
      imports: [ReactiveFormsModule],
      declarations: [LengthExcludingWhitespacePipe],
      providers: [
        {
          provide: IbanService,
          useValue: {
            validateIban: () => of(validationResult),
          },
        },
      ],
    });
  }

  it('should show the input', async () => {
    await setup(mockValidValidationResult);
    expect(screen.getByLabelText('Validate a Belgian IBAN')).toBeTruthy();
  });
});
