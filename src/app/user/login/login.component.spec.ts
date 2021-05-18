import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {of} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material/material.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {UserService} from '../../services/user.service';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatInputHarness} from '@angular/material/input/testing';
import {MatButtonHarness} from '@angular/material/button/testing';

class Router {
  navigate(r: string) {
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService = jasmine.createSpyObj('UserService', ['login']);
  let loginSpy = userService.login.and.returnValue(of());
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MaterialModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{
        provide: UserService, useValue: userService
      }, Router, FormBuilder, MatSnackBar, MaterialModule,]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('login form should be valid', () => {
    component.email.setValue('test@test.com');
    component.password.setValue('TestTest1234');
    const submit = fixture.debugElement.query(By.css('button[type=submit]'));
    expect(component.loginForm.valid).toBeTruthy();
    fixture.detectChanges();
    submit.nativeElement.click();
    fixture.detectChanges();
    expect(loginSpy).toHaveBeenCalledOnceWith({ email: 'test@test.com', password: 'TestTest1234' })
  });

  it('login form should be invalid', async () => {
    const emailField = await loader.getHarness<MatInputHarness>(MatInputHarness.with({
      selector: '[data-testid=email]',
    }));
    const passwordField = await loader.getHarness<MatInputHarness>(MatInputHarness.with({
      selector: '[data-testid=password]',
    }));
    const button = await loader.getHarness<MatButtonHarness>(MatButtonHarness.with({
      selector: '[data-testid=submit]',
    }))
    await emailField.setValue('test');
    await passwordField.setValue('  ');
    expect(component.loginForm.valid).toBeFalse();
    const isDisabled = await button.isDisabled();
    expect(isDisabled).toBeTrue()
  });
});
