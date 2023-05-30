import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewresulComponent } from './viewresul.component';

describe('ViewresulComponent', () => {
  let component: ViewresulComponent;
  let fixture: ComponentFixture<ViewresulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewresulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewresulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
