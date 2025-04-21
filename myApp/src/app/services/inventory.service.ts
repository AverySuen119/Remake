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
      id: 4521,
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
      id: 8643,
      name: 'Chair',
      category: 'Furniture',
      quantity: 50,
      price: 150,
      supplier: 'Comfort Furniture Inc.',
      stockStatus: 'Low Stock',
      featured: false,
      specialNote: ''
    },
      {
        id: 1341,
        name: 'Electric Kettle',
        category: 'Electronics',
        quantity: 50,
        price: 30,
        supplier: 'Home Essentials',
        stockStatus: 'In Stock',
        featured: true,
        specialNote: 'Quick boil kettle with automatic shut-off'
      },
      {
        id: 2343,
        name: 'Dining Table',
        category: 'Furniture',
        quantity: 8,
        price: 350,
        supplier: 'FurniCo',
        stockStatus: 'Low Stock',
        featured: false,
        specialNote: 'Solid wood dining table with 4 chairs'
      },
      {
        id: 1193,
        name: 'Sweater',
        category: 'Clothing',
        quantity: 25,
        price: 50,
        supplier: 'Winter Wardrobe',
        stockStatus: 'In Stock',
        featured: false,
        specialNote: 'Wool sweater, soft and cozy, perfect for winter'
      },
      {
        id: 9434,
        name: 'Cordless Vacuum Cleaner',
        category: 'Electronics',
        quantity: 15,
        price: 120,
        supplier: 'CleanTech',
        stockStatus: 'In Stock',
        featured: true,
        specialNote: 'Lightweight cordless vacuum with long battery life'
      },
      {
        id: 1215,
        name: 'Storage Cabinet',
        category: 'Furniture',
        quantity: 20,
        price: 150,
        supplier: 'Storage Solutions',
        stockStatus: 'Out of Stock',
        featured: false,
        specialNote: 'Adjustable storage cabinet with ample space'
      },
      {
        id:3226,
        name: 'Sports Shoes',
        category: 'Clothing',
        quantity: 40,
        price: 70,
        supplier: 'Sporty Goods',
        stockStatus: 'In Stock',
        featured: false,
        specialNote: 'Comfortable running shoes with great support'
      },
      {
        id: 1237,
        name: 'Work Gloves',
        category: 'Tools',
        quantity: 60,
        price: 10,
        supplier: 'Handy Tools',
        stockStatus: 'In Stock',
        featured: false,
        specialNote: 'Durable gloves for construction work and gardening'
      },
      {
        id: 1328,
        name: 'LED TV',
        category: 'Electronics',
        quantity: 5,
        price: 550,
        supplier: 'TechMart',
        stockStatus: 'Low Stock',
        featured: true,
        specialNote: 'Ultra HD, smart LED TV with voice control'
      },
      {
        id: 5569,
        name: 'Power Drill',
        category: 'Tools',
        quantity: 20,
        price: 80,
        supplier: 'ToolMaster',
        stockStatus: 'In Stock',
        featured: false,
        specialNote: 'Corded power drill with multiple speed settings'
      },
      {
        id: 2085,
        name: 'Barbecue Grill',
        category: 'Miscellaneous',
        quantity: 10,
        price: 250,
        supplier: 'Outdoor Living',
        stockStatus: 'In Stock',
        featured: true,
        specialNote: 'Portable barbecue grill with easy cleanup'
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