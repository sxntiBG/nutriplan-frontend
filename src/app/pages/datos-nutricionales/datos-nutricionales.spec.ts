import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosNutricionales } from './datos-nutricionales';

describe('DatosNutricionales', () => {
  let component: DatosNutricionales;
  let fixture: ComponentFixture<DatosNutricionales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosNutricionales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosNutricionales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
