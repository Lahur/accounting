import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindStrankaComponent } from './find-stranka.component';

describe('FindStrankaComponent', () => {
  let component: FindStrankaComponent;
  let fixture: ComponentFixture<FindStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
