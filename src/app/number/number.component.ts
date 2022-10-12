import { Component, Input, OnInit } from '@angular/core';
import { GlobalUtil } from 'src/shared/global.utils';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent implements OnInit {

  constructor() { }

  @Input() key: string = ""

  tapKey() {
    if (this.key.trim().length <= 0) {
      console.log("Undefined input")
      return
    }
    GlobalUtil.shared.keyed(this.key)
  }

  ngOnInit(): void {
  }

}
