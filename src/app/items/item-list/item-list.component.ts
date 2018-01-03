import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../shared/types/app-state';
import { ListItemClickData } from '../../shared/types/list-item-click-data';

import { Item } from '../types/item';
import { LoadItemsAction, DeleteItemAction } from '../state-management/item.actions';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent implements OnInit {

  private items$: Observable<Item[]>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
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
      case 'edit': {
        this.router.navigate(['edit', listItemData.payload.id], { relativeTo: this.route });
        break;
      }
      default: {
        console.warn(`${listItemData.type} is not supported in this list`);
      }
    }
  }

  private onAddClicked(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  private deleteItem(itemId: number): void {

  }
}
