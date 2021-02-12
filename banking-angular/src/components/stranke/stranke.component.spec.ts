import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrankeComponent } from './stranke.component';

describe('StrankeComponent', () => {
  let component: StrankeComponent;
  let fixture: ComponentFixture<StrankeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrankeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrankeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
