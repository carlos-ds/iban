import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbanValidationComponent } from './iban-validation.component';

describe('IbanValidationComponent', () => {
  let component: IbanValidationComponent;
  let fixture: ComponentFixture<IbanValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IbanValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IbanValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
