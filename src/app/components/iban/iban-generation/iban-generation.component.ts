import { Component, Input, OnInit } from '@angular/core';
import { Iban } from '../../../models/iban.model';

@Component({
  selector: 'iban-generation',
  templateUrl: './iban-generation.component.html',
  styleUrls: ['./iban-generation.component.scss'],
})
export class IbanGenerationComponent implements OnInit {
  @Input()
  previousIban: Iban[];

  constructor() {}

  ngOnInit(): void {}
}
