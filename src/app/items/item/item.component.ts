import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../types/item';
import { ListItemClickData } from '../../shared/types/list-item-click-data';

@Component({
  selector: 'app-item, [app-item]',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() item: Item;

  @Output() itemClicked: EventEmitter<ListItemClickData<Item>> = new EventEmitter<ListItemClickData<Item>>();

  constructor() { }

  private onItemClicked(): void {
    this.itemClicked.emit(new ListItemClickData('detail', this.item));
  }

  private onEditClicked(): void {
    this.itemClicked.emit(new ListItemClickData('edit', this.item));
  }

  private onDeleteClicked(): void {
    this.itemClicked.emit(new ListItemClickData('delete', this.item));
  }

}
