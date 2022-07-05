import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterCommonComponent } from './login-register-common.component';

describe('LoginRegisterCommonComponent', () => {
  let component: LoginRegisterCommonComponent;
  let fixture: ComponentFixture<LoginRegisterCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRegisterCommonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
