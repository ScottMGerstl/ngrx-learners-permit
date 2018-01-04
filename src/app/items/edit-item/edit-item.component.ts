import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from '../../shared/types/app-state';
import { EditItemAction } from '../state-management/item.actions';
import { Item } from '../types/item';
import { ItemFormData } from '../types/item-form-data';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditItemComponent implements OnInit {

  private item: Item;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.map(state => {
        this.item = state.items.filter(i => i.id === +params['item-id'])[0];
      }).subscribe();
    });
  }

  private onDoneClicked(data: ItemFormData): void {
    this.store.dispatch(new EditItemAction({
      id: data.id,
      name: data.name
    }));
  }

  private onCancelClicked(): void {
    this.router.navigate(['/items']);
  }
}
