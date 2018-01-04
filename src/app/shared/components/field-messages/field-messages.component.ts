import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessages } from '../../types/validation-messages';

@Component({
  selector: 'app-field-messages, [app-field-messages]',
  templateUrl: './field-messages.component.html',
  styleUrls: ['./field-messages.component.scss']
})
export class FieldMessagesComponent implements OnChanges {

  @Input() private control: FormControl;
  @Input() private description: string;
  @Input() private validationMessages: ValidationMessages;

  private validationErrorLibrary: ValidationError[];

  constructor() {
    this.validationErrorLibrary = [];
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['validationMessages']) {
      this.refreshLibrary();
    }
  }

  private isFieldValid(): boolean {
    return this.control.valid || this.control.touched === false;
  }

  private containsErrorKey(message: ValidationError): boolean {
    console.log(message);
    return Boolean(this.control && this.control.errors && this.control.errors[message.key]);
  }

  private refreshLibrary(): void {
    this.validationErrorLibrary = [];
    this.fillLibrary();
  }

  private fillLibrary(): void {
    this.validationErrorLibrary = [];

    Object.keys(this.validationMessages).forEach(key => {
      this.validationErrorLibrary.push({
        key,
        text: this.validationMessages[key]
      });
    });
  }
}

class ValidationError {
  public key: string;
  public text: string;
}
