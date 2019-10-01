import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progress1 = 25;
  progress2 = 35;

  constructor() { }

  ngOnInit() {
  }

  updateValue( event: number ) {
    this.progress2 = event;
  }
}
