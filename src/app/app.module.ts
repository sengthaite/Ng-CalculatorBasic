import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NumberComponent } from './number/number.component';
import { DisplayComponent } from './display/display.component';
import { RowComponent } from './row/row.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberComponent,
    DisplayComponent,
    RowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
