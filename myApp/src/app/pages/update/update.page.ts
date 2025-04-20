import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryItem } from 'src/app/models/inventory-item';
import { InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpdatePage {

  itemName = '';
  item: InventoryItem = {
    id: 0,
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    stockStatus: '', // 添加缺失字段
    featured: false, // 添加缺失字段
    specialNote: '', // 添加缺失字段
    supplier: '' // 添加缺失字段
  };  // 默认初始化

  loading = false;
  errorMessage: string | null = null;

  constructor(
    private inventoryService: InventoryService,
    private toastController: ToastController
  ) {}

  searchByName() {
    this.loading = true;
    this.inventoryService.getAllItems().subscribe(items => {
      // 在这里确保 item 符合 InventoryItem 类型
      this.item = items.find(i => i.name.toLowerCase() === this.itemName.toLowerCase()) || {
        id: 0,
        name: '',
        category: '',
        quantity: 0,
        price: 0,
        stockStatus: '',
        featured: false,
        specialNote: '',
        supplier: ''
      };
      if (!this.item.id) {
        this.showToast('Item not found.');
      }
      this.loading = false;
    }, () => {
      this.showToast('Failed to search for the item.');
      this.loading = false;
    });
  }

  updateItem() {
    if (!this.item || !this.item.id) return;

    this.inventoryService.updateItem(this.item.id, this.item).subscribe({
      next: () => this.showToast('Item updated successfully!'),
      error: () => this.showToast('Failed to update item.')
    });
  }

  deleteItem() {
    if (!this.item || !this.item.id) return;

    this.inventoryService.deleteItem(this.item.id).subscribe({
      next: () => {
        this.showToast('Item deleted successfully!');
        this.item = {
          id: 0,
          name: '',
          category: '',
          quantity: 0,
          price: 0,
          stockStatus: '',
          featured: false,
          specialNote: '',
          supplier: ''
        };  // 重置 item
        this.itemName = '';
      },
      error: () => this.showToast('Failed to delete item.')
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
