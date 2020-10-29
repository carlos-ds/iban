import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbanGenerationComponent } from './iban-generation.component';

describe('IbanGenerationComponent', () => {
  let component: IbanGenerationComponent;
  let fixture: ComponentFixture<IbanGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IbanGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IbanGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
