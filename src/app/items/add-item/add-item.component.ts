import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/types/app-state';
import { RedirectAction } from '../../state-management/navigation.actions';
import { CreateItemAction } from '../state-management/item.actions';
import { ItemFormData } from '../types/item-form-data';

@Component({
  selector: 'app-add-item, [app-add-item]',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemComponent {

  constructor(private store: Store<AppState>) { }

  public onDoneClicked(formData: ItemFormData): void {

    this.store.dispatch(new CreateItemAction(formData, { successActions: [new RedirectAction('/items')]}));
  }

  private onCancelClicked(): void {
    this.store.dispatch(new RedirectAction('/items'));
  }
}
