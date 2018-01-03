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

  @Input() editItem: Item;

  @Output() doneClicked: EventEmitter<ItemFormData> = new EventEmitter<ItemFormData>();

  private itemForm: FormGroup;
  private formData: ItemFormData;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.setupForm();

    if (this.editItem) {
      this.itemForm.patchValue({ name: this.editItem.name });
    }
  }

  private onDoneClicked(): void {

    const formResult: ItemFormData = {
      name: this.itemForm.get('name').value
    };

    if (this.editItem) {
      formResult.id = this.editItem.id;
    }

    this.doneClicked.emit(formResult);
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
