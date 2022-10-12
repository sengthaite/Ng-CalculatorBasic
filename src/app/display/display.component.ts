import { Component, Input, OnInit } from '@angular/core';
import { GlobalUtil } from 'src/shared/global.utils';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  
  get displayResult(): string {
    return GlobalUtil.shared.resultDisplay
  }

  constructor() { }

  ngOnInit(): void {
  }

}
