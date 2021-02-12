import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljiRacunaComponent } from './detalji-racuna.component';

describe('DetaljiRacunaComponent', () => {
  let component: DetaljiRacunaComponent;
  let fixture: ComponentFixture<DetaljiRacunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljiRacunaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljiRacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
