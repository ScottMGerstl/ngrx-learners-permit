import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/types/app-state';
import { ItemFormData } from '../types/item-form-data';
import { CreateItemAction } from '../state-management/item.actions';

@Component({
  selector: 'app-add-item, [app-add-item]',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {

  constructor(private store: Store<AppState>) { }

  public onDoneClicked(formData: ItemFormData): void {
    this.store.dispatch(new CreateItemAction(formData));
  }
}
