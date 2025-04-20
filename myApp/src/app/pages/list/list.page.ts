import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryItem } from 'src/app/models/inventory-item';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 为 ngModel 提供支持
import { RouterModule } from '@angular/router'; // 为 routerLink 提供支持

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class ListPage implements OnInit {
  items: InventoryItem[] = [];  // 用于存储所有商品
  searchName: string = '';  // 用于存储搜索框输入的名称
  loading = false;  // 加载状态
  errorMessage: string = '';  // 错误信息
  
  constructor(private inventoryService: InventoryService) {
    
  }

  

  ngOnInit() {
    this.loadAllItems();  // 初始化时加载所有商品
  }

  
  // 加载所有商品数据
  loadAllItems() {
    this.loading = true;
    this.errorMessage = '';  // 清空之前的错误信息
    this.inventoryService.getAllItems().subscribe({
      next: (data: InventoryItem[]) => {
        this.items = data || [];  // 确保数据是数组，即使为空
        this.loading = false;
      },
      error: (err) => {
        console.error('加载物品失败:', err); // 打印具体错误信息
        this.loading = false;
        this.errorMessage = '加载物品失败，请稍后再试。';
      }
    });
  }
  
 // 搜索商品
 searchItem() {
  console.log('进入 searchItem 方法');  // 添加更多调试日志
  console.log('搜索框触发');  // 添加调试日志，检查是否触发

  if (!this.searchName.trim()) {
    console.log('搜索框为空，重新加载所有商品');
    this.loadAllItems();  // 如果搜索框为空，重新加载所有商品
    return;
  }

  this.loading = true;
  this.errorMessage = '';  // 清除之前的错误信息

  // 调用服务端搜索方法
  this.inventoryService.getItemByName(this.searchName).subscribe({
    next: (item: InventoryItem | undefined) => {
      console.log('搜索结果:', item); // 打印搜索结果
      if (item) {
        this.items = [item];  // 如果找到商品，包装成数组
      } else {
        this.items = [];  // 如果没有找到商品，清空列表
        this.errorMessage = '没有找到匹配的物品。';
      }
      this.loading = false;
    },
    error: (err) => {
      console.error('搜索失败:', err); // 打印具体错误信息
      this.loading = false;
      this.errorMessage = '搜索失败，请稍后再试。';
    }
  });
}}