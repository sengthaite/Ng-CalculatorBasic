import { Component, HostListener } from '@angular/core';
import { GlobalUtil } from 'src/shared/global.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Calculator';

  display = [
    ["AC +/_ % ÷"],
    ["7 8 9 ×"],
    ["4 5 6 -"],
    ["1 2 3 +"],
    [" 0 . ="]
  ]

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    GlobalUtil.shared.keyed(event.key)
  }

}
