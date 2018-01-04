import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../shared/types/app-state';
import { CreateItemAction } from '../state-management/item.actions';
import { ItemFormData } from '../types/item-form-data';

@Component({
  selector: 'app-add-item, [app-add-item]',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddItemComponent {

  constructor(private store: Store<AppState>, private router: Router) { }

  public onDoneClicked(formData: ItemFormData): void {
    this.store.dispatch(new CreateItemAction(formData));
  }

  private onCancelClicked(): void {
    this.router.navigate(['/items']);
  }
}
