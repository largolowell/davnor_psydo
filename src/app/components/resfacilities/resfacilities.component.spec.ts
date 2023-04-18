import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResfacilitiesComponent } from './resfacilities.component';

describe('ResfacilitiesComponent', () => {
  let component: ResfacilitiesComponent;
  let fixture: ComponentFixture<ResfacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResfacilitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResfacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
