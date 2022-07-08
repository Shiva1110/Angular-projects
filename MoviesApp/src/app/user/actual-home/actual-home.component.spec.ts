import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualHomeComponent } from './actual-home.component';

describe('ActualHomeComponent', () => {
  let component: ActualHomeComponent;
  let fixture: ComponentFixture<ActualHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
