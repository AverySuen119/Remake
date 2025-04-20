import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { InventoryItem } from '../models/inventory-item';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private baseUrl = 'https://prog2005.it.scu.edu.au/ArtGalley';

  private items: InventoryItem[] = [
    {
      id: 1,
      name: 'Laptop',
      category: 'Electronics',
      quantity: 10,
      price: 1000,
      supplier: 'Tech Supplies Co.',
      stockStatus: 'In Stock',
      featured: false,
      specialNote: 'Newest model with high performance'
    },
    {
      id: 2,
      name: 'Chair',
      category: 'Furniture',
      quantity: 50,
      price: 150,
      supplier: 'Comfort Furniture Inc.',
      stockStatus: 'Low Stock',
      featured: false,
      specialNote: ''
    }
  ];

  constructor(private http: HttpClient) {}

  // 获取所有库存项
  getAllItems(): Observable<InventoryItem[]> {
    return of(this.items);
  }

  // 通过物品名称获取单个库存项
  getItemByName(name: string): Observable<InventoryItem | undefined> {
    const lowerCaseName = name.toLowerCase();
    return of(this.items.find(item => item.name.toLowerCase().includes(lowerCaseName)));
  }

  // 通过物品 ID 获取单个库存项
  getItemById(id: number): Observable<InventoryItem | undefined> {
    return of(this.items.find(item => item.id === id));
  }

  // 添加新库存项
  addItem(item: InventoryItem): Observable<InventoryItem> {
    this.items.push(item);
    return of(item);
  }

  // 更新库存项
  updateItem(id: number, item: InventoryItem): Observable<InventoryItem | null> {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      this.items[index] = item;
      return of(item);
    }
    return of(null); // 如果没有找到，则返回 null
  }

  // 删除库存项
  deleteItem(id: number): Observable<InventoryItem | null> {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      const deletedItem = this.items.splice(index, 1)[0];
      return of(deletedItem);
    }
    return of(null); // 如果没有找到，则返回 null
  }
}