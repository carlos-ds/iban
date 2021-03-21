import { ValidationResult } from '../../../models/iban.model';
import { IbanValidationComponent } from './iban-validation.component';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IbanService } from 'src/app/services/iban.service';
import { of } from 'rxjs';

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
  async function setup(validationResult: ValidationResult) {
    const component = await render(IbanValidationComponent, {
      componentProviders: [
        {
          provide: IbanService,
          useValue: {
            validateIban: () => of(validationResult),
          },
        },
      ],
    });

    return component;
  }

  it('should show the input', async () => {
    await setup(mockValidValidationResult);
    expect(screen.getByLabelText('Validate a Belgian IBAN')).toBeTruthy();
  });

  it('should have data-valid set to true if validation result is valid', async () => {
    await setup(mockValidValidationResult);
    await userEvent.type(
      screen.getByLabelText('Validate a Belgian IBAN'),
      mockValidValidationResult.iban
    );
    const input = screen.getByLabelText('Validate a Belgian IBAN');
    expect(input.getAttribute('data-valid')).toEqual('true');
  });

  it('should have data-valid set to true if validation result is valid', async () => {
    await setup(mockInvalidValidationResult);
    await userEvent.type(
      screen.getByLabelText('Validate a Belgian IBAN'),
      mockInvalidValidationResult.iban
    );
    const input = screen.getByLabelText('Validate a Belgian IBAN');
    expect(input.getAttribute('data-valid')).toEqual('false');
  });
});
