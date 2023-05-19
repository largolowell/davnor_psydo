import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsheetComponent } from './reservationsheet.component';

describe('ReservationsheetComponent', () => {
  let component: ReservationsheetComponent;
  let fixture: ComponentFixture<ReservationsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
