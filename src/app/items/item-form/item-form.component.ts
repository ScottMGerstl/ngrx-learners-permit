import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldValidationMessages } from '../../shared/types/field-validation-messages';
import { Item } from '../types/item';
import { ItemFormData } from '../types/item-form-data';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemFormComponent implements OnInit {

  @Input() public editItem: Item;

  @Output() public doneClicked: EventEmitter<ItemFormData> = new EventEmitter<ItemFormData>();
  @Output() public cancelClicked: EventEmitter<null> = new EventEmitter<null>();

  private itemForm: FormGroup;
  private formData: ItemFormData;

  private formMessages: FieldValidationMessages;

  constructor(private fb: FormBuilder) {
    this.formMessages = this.buildFormMessages();
  }

  public ngOnInit(): void {
    this.setupForm();

    if (this.editItem) {
      this.itemForm.patchValue({ name: this.editItem.name });
    }
  }

  private onDoneClicked(): void {

    this.validateFormFields();

    if (this.itemForm.invalid) {
      return;
    }

    const formResult: ItemFormData = {
      name: this.itemForm.get('name').value
    };

    if (this.editItem) {
      formResult.id = this.editItem.id;
    }

    this.doneClicked.emit(formResult);
  }

  private onCancelClicked(): void {
    this.cancelClicked.emit();
  }

  public clearForm(): void {
    this.itemForm.patchValue({ name: null });
  }

  private setupForm(): void {
    this.itemForm = new FormGroup ({
      name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(50)]
      })});
  }

  private validateFormFields(): void {
    Object.keys(this.itemForm.controls).forEach(field => {
      const control = this.itemForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  private buildFormMessages(): FieldValidationMessages {
    return {
      name: {
        required: 'Name is required',
        maxlength: 'Name cannot exceed 50 characters'
      }
    };
  }
}
