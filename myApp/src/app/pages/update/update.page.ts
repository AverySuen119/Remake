import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryItem } from 'src/app/models/inventory-item';
import { InventoryService } from 'src/app/services/inventory.service';
import { RouterModule } from '@angular/router'; // 加入 RouterModule

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class UpdatePage {

  itemName = '';
  item: InventoryItem | null = null;

  loading = false;
  errorMessage: string | null = null;

  constructor(
    private inventoryService: InventoryService,
    private toastController: ToastController
  ) {}

  searchByName() {
    if (!this.itemName.trim()) {
      this.showToast('请输入物品名称');
      return;
    }

    this.loading = true;
    this.inventoryService.getItemByName(this.itemName.trim()).subscribe({
      next: (result) => {
        if (result) {
          this.item = result;
        } else {
          this.item = null;
          this.showToast('未找到该物品');
        }
        this.loading = false;
      },
      error: () => {
        this.item = null;
        this.showToast('搜索失败，请稍后再试');
        this.loading = false;
      }
    });
  }

  updateItem() {
    if (!this.item || !this.item.name) return;

    this.inventoryService.updateItem(this.item.id, this.item).subscribe({
      next: () => this.showToast('更新成功'),
      error: () => this.showToast('更新失败')
    });
  }

  deleteItem() {
    if (!this.item || !this.item.name) return;

    this.inventoryService.deleteItem(this.item.id).subscribe({
      next: () => {
        this.showToast('删除成功');
        this.item = null;
        this.itemName = '';
      },
      error: () => this.showToast('删除失败')
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
