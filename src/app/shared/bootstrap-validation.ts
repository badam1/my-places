import {AbstractControl} from '@angular/forms';
export interface BootstrapValidation {
  giveBootstrapValidationClassDiv(control: AbstractControl): string;
  giveBootstrapValidationClassInput(control: AbstractControl): string;
}
