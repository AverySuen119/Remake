import { Component, Input } from '@angular/core';
import { AlertController, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { helpCircle } from 'ionicons/icons';

@Component({
  selector: 'app-help-button',
  template: `
    <ion-button (click)="showHelp()" fill="clear">
      <ion-icon slot="icon-only" name="help-circle"></ion-icon>
    </ion-button>
  `,
  standalone: true,
  imports: [IonButton, IonIcon]
})
export class HelpButtonComponent {
  @Input() helpContent: string = '';
  @Input() isHtml: boolean = false;

  constructor(private alertController: AlertController) {
    addIcons({ helpCircle });
  }

  async showHelp() {
    const alert = await this.alertController.create({
      header: '帮助信息',
      message: this.helpContent,
      buttons: ['我知道了']
    });
    await alert.present();
  }
}