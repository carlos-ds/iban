import { Component, OnInit } from '@angular/core';

import { Iban } from '../../models/iban.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'iban',
  templateUrl: './iban.component.html',
  styleUrls: ['./iban.component.scss'],
})
export class IbanComponent {
  constructor() {}
}
