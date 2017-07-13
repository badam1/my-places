import {Component} from '@angular/core';
import {AbstractControl, NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {BootstrapValidationService} from '../../shared/bootstrap-validation.service';
import {AlertService} from '../../shared/alert/alert.service';
import {Alert} from '../../shared/alert/alert';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {

  constructor(private auth: AuthService, private router: Router, private bootstrapService: BootstrapValidationService, private alertService: AlertService) {
  }

  onSignUp(signUpForm: NgForm) {
    const email = signUpForm.value.email;
    const password = signUpForm.value.password;
    const username = signUpForm.value.username;
    this.auth.signUpUser(email, username, password).catch((error) => {
      console.log(error);
      this.alertService.showAlert.next(new Alert('ERROR', 'Something wrong with the given data! Please try again', 'alert-danger'));
    }).then(
      () => {
        signUpForm.reset();
        this.router.navigate(['/home']);
      }
    ).catch(alert);
  }

  giveBootstrapValidationClassDiv(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassDiv(control);
  }

  giveBootstrapValidationClassInput(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassInput(control);
  }
}
