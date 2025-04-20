import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryItem } from 'src/app/models/inventory-item';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';  // 导入 CUSTOM_ELEMENTS_SCHEMA

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],  // 引入所有必要的模块
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // 添加 CUSTOM_ELEMENTS_SCHEMA
})
export class AddPage implements OnInit {
  newItem: InventoryItem = {
    id: 0,
    name: '',
    category: '',
    quantity: 0,
    price: 0,
    supplier: '',
    stockStatus: '',
    featured: false,
    specialNote: ''
  };

  featuredItems: InventoryItem[] = [];
  loading = false;

  constructor(
    private inventoryService: InventoryService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadFeaturedItems();
  }

  addItem() {
    // 基本字段验证
    if (!this.newItem.name || !this.newItem.category || this.newItem.quantity <= 0) {
      this.showToast('Please fill in all required fields.');
      return;
    }

    // 调用服务并反馈
    this.inventoryService.addItem(this.newItem).subscribe({
      next: (item) => {
        this.showToast('Item added successfully!');
        this.router.navigate(['/tabs/list']);
      },
      error: () => {
        this.showToast('Failed to add item.');
      }
    });
  }

  loadFeaturedItems() {
    this.inventoryService.getAllItems().subscribe(items => {
      this.featuredItems = items.filter(item => item.featured === false);
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
