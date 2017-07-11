import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.css']
})
export class PlaceFormComponent implements OnInit {

  placeForm: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.placeForm = new FormGroup({
      'name': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.placeForm);
  }

}
