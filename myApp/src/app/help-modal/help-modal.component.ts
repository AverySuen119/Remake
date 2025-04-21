import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';  // 导入 IonicModule

@Component({
  selector: 'app-help-modal',
  imports: [IonicModule],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>帮助</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="close()">关闭</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h2>如何使用本系统</h2>
      <p>在此页面，您可以管理库存物品、添加新的物品或更新现有物品的信息。</p>
      <p>如果遇到问题，可以随时点击右下角的“帮助”按钮以获得更多指导。</p>
      <p>如需进一步支持，请联系我们的客服团队。</p>
    </ion-content>
  `,
  standalone: true
})
export class HelpModalComponent {

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}
