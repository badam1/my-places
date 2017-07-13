import {Component, OnDestroy, OnInit} from '@angular/core';
import {Alert} from './alert';
import {Subject} from 'rxjs/Subject';
import {AlertService} from './alert.service';
import {Subscription} from 'rxjs/Subscription';
import {alertAnimation} from './alert-animation';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['alert.component.css'],
  animations: alertAnimation
})
export class AlertComponent implements OnInit, OnDestroy {
  state = 'out';
  alert: Alert;
  showAlert: Subject<Alert>;
  alertSubscription: Subscription;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.showAlert = this.alertService.showAlert;
    this.alertSubscription = this.showAlert.subscribe(alert => {
      this.alert = alert;
      this.state = 'in';
      new TimerObservable(5000).subscribe(() => this.state = 'out');
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

}
