import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { FieldMessagesComponent } from './components/field-messages/field-messages.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule
  ],
  declarations: [
    AddButtonComponent,
    FieldMessagesComponent
  ],
  exports: [
    AddButtonComponent,
    FieldMessagesComponent
  ]
})
export class SharedModule { }
