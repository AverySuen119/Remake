import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryItem } from 'src/app/models/inventory-item';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  loadFeaturedItems() {
    this.inventoryService.getAllItems().subscribe(items => {
      this.featuredItems = items.filter(item => item.featured === true);
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
