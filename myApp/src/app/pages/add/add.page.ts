import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryItem } from 'src/app/models/inventory-item';
import { HelpButtonComponent } from 'src/app/help-button/help-button.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HelpButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddPage implements OnInit {
  newItem: InventoryItem = {
    id: 0,
    name: '',
    category: '',  // 变成下拉选择
    quantity: 0,
    price: 0,
    supplier: '',
    stockStatus: '',  // 变成下拉选择
    featured: false,
    specialNote: ''
  };

  // 可选的Category和StockStatus选项
  categories: ('Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous')[] = [
    'Electronics',
    'Furniture',
    'Clothing',
    'Tools',
    'Miscellaneous'
  ];

  stockStatuses: ('In Stock' | 'Low Stock' | 'Out of Stock')[] = [
    'In Stock',
    'Low Stock',
    'Out of Stock'
  ];

  allItems: InventoryItem[] = [];  // 存储所有物品
  filteredItems: InventoryItem[] = [];  // 存储筛选后的物品列表
  loading = false;

  constructor(
    private inventoryService: InventoryService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadItems();  // 加载所有物品数据
  }

  // 加载所有物品
  loadItems() {
    this.inventoryService.getAllItems().subscribe(items => {
      this.allItems = items;  // 保存所有物品
      this.filteredItems = items;  // 默认显示所有物品
    });
  }

  // 筛选物品
  filterItems(showFeatured: boolean) {
    if (showFeatured) {
      this.filteredItems = this.allItems.filter(item => item.featured === true);  // 只显示特色物品
    } else {
      this.filteredItems = [...this.allItems];  // 显示所有物品
    }
  }

  // 添加物品
  addItem() {
    if (!this.newItem.name || !this.newItem.category || this.newItem.quantity <= 0) {
      this.showToast('请填写所有必填项');
      return;
    }

    this.loading = true;

    this.inventoryService.addItem(this.newItem).subscribe({
      next: (item) => {
        this.showToast('添加成功！');
        this.router.navigate(['/tabs/list']);
        this.loading = false;
      },
      error: () => {
        this.showToast('添加失败');
        this.loading = false;
      }
    });
  }

  // 显示消息
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
