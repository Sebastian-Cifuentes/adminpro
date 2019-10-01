import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-graphics-donuts',
  templateUrl: './graphics-donuts.component.html',
  styles: []
})
export class GraphicsDonutsComponent implements OnInit {

  @Input() labels: Label[] = [];
  @Input() data: MultiDataSet = [];
  @Input() type = '';
  @Input() leyenda = '';

  constructor() { }

  ngOnInit() {
  }

}
