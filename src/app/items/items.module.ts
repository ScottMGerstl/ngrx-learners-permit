import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { ItemsService } from './services/items.service';

import { itemReducer } from './item.reducer';
import { ItemEffects } from './item.effects';

@NgModule({
  declarations: [
    ItemListComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.forFeature([ItemEffects]),
    StoreModule.forFeature('items', itemReducer),
  ],
  exports: [
    ItemListComponent
  ],
  providers: [
    ItemsService
  ]
})
export class ItemModule { }
