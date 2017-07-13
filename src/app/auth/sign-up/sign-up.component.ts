import {Component} from '@angular/core';
import {AbstractControl, NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {BootstrapValidationService} from '../../shared/bootstrap-validation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private auth: AuthService, private router: Router, private bootstrapService: BootstrapValidationService) {
  }

  onSignUp(signUpForm: NgForm) {
    const email = signUpForm.value.email;
    const password = signUpForm.value.password;
    const username = signUpForm.value.username;
    this.auth.signUpUser(email, username, password);
    signUpForm.reset();
    this.router.navigate(['/home']);
  }

  giveBootstrapValidationClassDiv(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassDiv(control);
  }

  giveBootstrapValidationClassInput(control: AbstractControl): string {
    return this.bootstrapService.giveBootstrapValidationClassInput(control);
  }
}
