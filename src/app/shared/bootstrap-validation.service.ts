import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {BootstrapValidation} from './bootstrap-validation';

@Injectable()
export class BootstrapValidationService implements BootstrapValidation {

  giveBootstrapValidationClassDiv(control: AbstractControl): string {
    if (control.touched) {
      if (control.valid) {
        return 'has-success';
      } else {
        return 'has-danger'
      }
    }
    return '';
  }

  giveBootstrapValidationClassInput(control: AbstractControl): string {
    if (control.touched) {
      if (control.valid) {
        return 'form-control-success';
      } else {
        return 'form-control-danger'
      }
    }
    return ''
  }
}
