import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  //BUDAPEST
  lat = 47.498924;
  lng = 19.040579;

  constructor() { }

  ngOnInit() {
  }

}
