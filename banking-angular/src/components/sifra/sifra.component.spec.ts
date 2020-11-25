import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifraComponent } from './sifra.component';

describe('SifraComponent', () => {
  let component: SifraComponent;
  let fixture: ComponentFixture<SifraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SifraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SifraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
