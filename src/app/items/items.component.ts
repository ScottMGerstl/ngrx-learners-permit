import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../shared/types/app-state';
import { LoadItemsAction } from './state-management/item.actions';
import { Item } from './types/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  public ngOnInit(): void {
    this.store.dispatch(new LoadItemsAction());
  }
}
