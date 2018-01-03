import { NgModule } from '@angular/core';
import { AddButtonComponent } from './components/add-button/add-button.component';

@NgModule({
  declarations: [
    AddButtonComponent
  ],
  exports: [
    AddButtonComponent
  ]
})
export class SharedModule { }
