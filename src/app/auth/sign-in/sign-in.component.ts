import {Component} from '@angular/core';
import {AbstractControl, NgForm} from '@angular/forms';

import {AuthService} from '../auth.service';
import {BootstrapValidationService} from '../../shared/bootstrap-validation.service';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert/alert.service';
import {Alert} from '../../shared/alert/alert';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  constructor(private bootstrapService: BootstrapValidationService, private auth: AuthService,
              private router: Router, private alertService: AlertService) {
  }

  onSignIn(signInForm: NgForm) {
    const email = signInForm.value.email;
    const password = signInForm.value.password;
    this.auth.signInUser(email, password).catch(error => {
      console.log(error);
      this.alertService.showAlert.next(new Alert('ERROR', 'Invalid Username or Password!', 'alert-danger'));
    });
    signInForm.reset();
  }

  onClickSignUp() {
    this.router.navigate(['/signup']);
  }

  giveBootstrapValidationClassDiv(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassDiv(control);
  }

  giveBootstrapValidationClassInput(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassInput(control);
  }
}
