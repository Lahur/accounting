import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaStrankaComponent } from './nova-stranka.component';

describe('NovaStrankaComponent', () => {
  let component: NovaStrankaComponent;
  let fixture: ComponentFixture<NovaStrankaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaStrankaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaStrankaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
