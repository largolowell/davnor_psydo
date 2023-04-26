import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResdavnorgymComponent } from './resdavnorgym.component';

describe('ResdavnorgymComponent', () => {
  let component: ResdavnorgymComponent;
  let fixture: ComponentFixture<ResdavnorgymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResdavnorgymComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResdavnorgymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
