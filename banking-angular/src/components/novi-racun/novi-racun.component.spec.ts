import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviRacunComponent } from './novi-racun.component';

describe('NoviRacunComponent', () => {
  let component: NoviRacunComponent;
  let fixture: ComponentFixture<NoviRacunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviRacunComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviRacunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
