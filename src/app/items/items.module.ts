import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { ItemsService } from './services/items.service';

import { itemReducer } from './item.reducer';
import { ItemEffects } from './item.effects';
import { ItemFormComponent } from './item-form/item-form.component';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  declarations: [
    ItemListComponent,
    ItemComponent,
    ItemFormComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
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
