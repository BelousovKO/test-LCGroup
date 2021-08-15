import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {TableComponent} from './components/table/table.component';
import {FiltersComponent} from './components/filters/filters.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FiltersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
