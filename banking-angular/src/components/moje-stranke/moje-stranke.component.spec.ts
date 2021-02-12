import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojeStrankeComponent } from './moje-stranke.component';

describe('MojeStrankeComponent', () => {
  let component: MojeStrankeComponent;
  let fixture: ComponentFixture<MojeStrankeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojeStrankeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MojeStrankeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
