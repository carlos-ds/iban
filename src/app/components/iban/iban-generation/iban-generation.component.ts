import { Component, OnInit } from '@angular/core';
import { Iban } from '../../../models/iban.interface';
import { IbanService } from '../../../services/iban.service';

@Component({
  selector: 'app-iban-generation',
  templateUrl: './iban-generation.component.html',
  styleUrls: ['./iban-generation.component.scss'],
})
export class IbanGenerationComponent implements OnInit {
  public previousIbans: Iban[];
  public result: string;

  constructor(private ibanService: IbanService) {}

  public ngOnInit(): void {
    this.result = 'BE__ ____ ____ ____';

    this.ibanService.getGeneratedIbans().subscribe((iban) => {
      this.previousIbans = iban;
    });
  }

  public generateIban(): void {
    this.ibanService.createIban().subscribe((iban) => {
      this.previousIbans = [...iban];
      this.result = iban[0].accountNumber;
    });
  }
}
