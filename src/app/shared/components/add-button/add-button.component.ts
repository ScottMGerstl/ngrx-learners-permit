import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button, [app-add-button]',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {

  @Output() private buttonClicked: EventEmitter<null> = new EventEmitter<null>();

  constructor() { }

  private onButtonClicked(): void {
    this.buttonClicked.emit();
  }
}
