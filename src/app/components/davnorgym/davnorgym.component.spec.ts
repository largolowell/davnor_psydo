import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DavnorgymComponent } from './davnorgym.component';

describe('DavnorgymComponent', () => {
  let component: DavnorgymComponent;
  let fixture: ComponentFixture<DavnorgymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DavnorgymComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DavnorgymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
