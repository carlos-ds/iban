import { Iban, ValidationResult } from '../../../models/iban.model';
import { IbanGenerationComponent } from './iban-generation.component';
import { render, screen, fireEvent } from '@testing-library/angular';
import { IbanService } from 'src/app/services/iban.service';
import { of } from 'rxjs';

const mockIbans: Iban[] = [
  {
    id: 1,
    accountNumber: 'BE76 5599 4230 6595',
    createdAt: '2020-03-03T00:00:00.000Z',
    createdBy: 'GENERATE',
  },
  {
    id: 2,
    accountNumber: 'BE67 4652 4188 4787',
    createdAt: '2020-03-03T00:00:00.000Z',
    createdBy: 'GENERATE',
  },
  {
    id: 3,
    accountNumber: 'BE33 4978 4106 8346',
    createdAt: '2020-03-03T00:00:00.000Z',
    createdBy: 'GENERATE',
  },
  {
    id: 4,
    accountNumber: 'BE34 8984 2176 9090',
    createdAt: '2020-03-03T00:00:00.000Z',
    createdBy: 'GENERATE',
  },
  {
    id: 5,
    accountNumber: 'BE62 0729 0838 7761',
    createdAt: '2020-03-03T00:00:00.000Z',
    createdBy: 'GENERATE',
  },
];

const mockValidationResult: ValidationResult = {
  iban: 'BE62 6501 2926 5661',
  has16Characters: true,
  startsWithBelgianPrefix: true,
  endsWithNumbers: true,
  hasValidBbanChecksum: true,
  hasValidIbanChecksum: true,
};

describe('IbanGenerationComponent', () => {
  async function setup(previousIbans: Iban[], accountNumber: string) {
    const component = await render(IbanGenerationComponent, {
      providers: [
        {
          provide: IbanService,
          useValue: {
            getGeneratedIbans: () => of(mockIbans),
            createIban: () => of(['BE62 6501 2926 5661']),
            validateIban: (
              iban,
              has16Characters,
              startsWithBelgianPrefix,
              endsWithNumbers,
              hasValidBbanChecksum,
              hasValidIbanChecksum
            ) =>
              of({
                iban,
                has16Characters,
                startsWithBelgianPrefix,
                endsWithNumbers,
                hasValidBbanChecksum,
                hasValidIbanChecksum,
              }),
          },
        },
      ],
      componentProperties: {
        previousIbans: previousIbans,
        result: accountNumber,
      },
    });

    return { component };
  }

  it('should show the last 5 IBANs', async () => {
    const component = await setup(mockIbans, 'BE76 5599 4230 6595');
    expect(screen.getByText('BE76 5599 4230 6595')).toBeTruthy();
    expect(screen.getByText('BE67 4652 4188 4787')).toBeTruthy();
    expect(screen.getByText('BE33 4978 4106 8346')).toBeTruthy();
    expect(screen.getByText('BE34 8984 2176 9090')).toBeTruthy();
    expect(screen.getByText('BE62 0729 0838 7761')).toBeTruthy();
    expect(() => {
      screen.getByText('BE30 0000 0000 1111');
    }).toThrow();
  });

  it('should show the generated IBAN after clicking', async () => {
    const component = await setup(mockIbans, 'BE76 5599 4230 6595');
    const generateButton = screen.getByText(/Generate a random Belgian IBAN/i);
    expect(() => {
      screen.getByText('BE62 6501 2926 5661');
    }).toThrow();
    fireEvent.click(generateButton);
    await screen.findByText('BE62 6501 2926 5661');
  });
});
