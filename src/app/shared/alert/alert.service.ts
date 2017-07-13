import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Alert} from './alert';

@Injectable()
export class AlertService {
  showAlert = new Subject<Alert>();
}
