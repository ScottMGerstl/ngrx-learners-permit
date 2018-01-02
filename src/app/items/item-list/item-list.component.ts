import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Item } from '../types/item';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../shared/types/app-state';
import { LoadItemsAction, DeleteItemAction } from '../item.actions';
import { ListItemClickData } from '../../shared/types/list-item-click-data';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit {

  private items$: Observable<Item[]>;

  constructor(private store: Store<AppState>) {
    this.items$ = this.store.select(state => state.items);
  }

  public ngOnInit(): void {
    this.getItems();
  }

  private getItems(): void {
    this.store.dispatch(new LoadItemsAction());
  }

  private onItemClicked(listItemData: ListItemClickData<Item>): void {

    switch (listItemData.type) {
      case 'delete': {
        this.store.dispatch(new DeleteItemAction(listItemData.payload));
        break;
      }
      default: {
        console.warn(`${listItemData.type} is not supported in this list`);
      }
    }
  }

  private deleteItem(itemId: number): void {

  }
}
