import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Item } from '../types/item';
import { ItemFormData } from '../types/item-form-data';
import { AppState } from '../../shared/types/app-state';
import { EditItemAction, SelectItemAction } from '../state-management/item.actions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  private item: Item;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

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
}
