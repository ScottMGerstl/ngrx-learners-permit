import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ItemFormData } from '../types/item-form-data';
import { Item } from '../types/item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  @Input() data: Item;

  @Output() doneClicked: EventEmitter<null> = new EventEmitter<null>();

  private itemForm: FormGroup;
  private formData: ItemFormData;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.setupForm();

    if (this.data) {
      this.itemForm.patchValue({ name: this.data.name });
    }
  }

  private onDoneClicked(): void {
    this.doneClicked.emit();
  }

  public clearForm(): void {
    this.itemForm.patchValue({ name: null });
  }

  private setupForm(): void {
    this.itemForm = new FormGroup ({
      name: new FormControl('', {
        validators: Validators.required,
      })},
      { updateOn: 'blur' });
  }
}
