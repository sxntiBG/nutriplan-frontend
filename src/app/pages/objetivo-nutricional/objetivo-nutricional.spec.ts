import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetivoNutricional } from './objetivo-nutricional';

describe('ObjetivoNutricional', () => {
  let component: ObjetivoNutricional;
  let fixture: ComponentFixture<ObjetivoNutricional>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjetivoNutricional]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetivoNutricional);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
