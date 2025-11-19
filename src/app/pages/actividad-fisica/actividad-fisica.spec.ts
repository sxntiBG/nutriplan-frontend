import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadFisica } from './actividad-fisica';

describe('ActividadFisica', () => {
  let component: ActividadFisica;
  let fixture: ComponentFixture<ActividadFisica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadFisica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActividadFisica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
