import { Component, OnInit } from '@angular/core';

import { IbanService } from '../../services/iban.service';

import { Iban } from '../../models/iban.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.scss'],
})
export class IbanComponent implements OnInit {
  iban: Iban[];
  constructor(private ibanService: IbanService) {}

  ngOnInit(): void {
    this.ibanService.getIban().subscribe((iban) => {
      this.iban = iban;
    });
  }
}
