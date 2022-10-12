import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  @Input() keyData: string = ""

  get keys(): string[] {
    return this.keyData.split(' ')
  }

  constructor() { }

  ngOnInit(): void {
  }

}
