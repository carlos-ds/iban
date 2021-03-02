import { Component, Input, OnInit } from '@angular/core';
import { Iban } from '../../../models/iban.model';
import { IbanService } from '../../../services/iban.service';

@Component({
  selector: 'iban-generation',
  templateUrl: './iban-generation.component.html',
  styleUrls: ['./iban-generation.component.scss'],
})
export class IbanGenerationComponent implements OnInit {
  previousIbans: Iban[];
  result: string;

  constructor(private ibanService: IbanService) {}

  ngOnInit(): void {
    this.result = 'BE__ ____ ____ ____';

    this.ibanService.getIbans().subscribe((iban) => {
      this.previousIbans = iban;
    });
  }

  generateIban() {
    this.ibanService.createIban().subscribe((iban) => {
      this.previousIbans = [...iban];
      this.result = iban[0].accountNumber;
    });
  }
}
