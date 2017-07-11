import { Injectable } from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

@Injectable()
export class BootstrapValidationService {

  constructor() { }

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
