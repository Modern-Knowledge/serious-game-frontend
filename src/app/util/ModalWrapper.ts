import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ComponentProps, ComponentRef } from "@ionic/core";

@Injectable()
export class ModalWrapper {
  constructor(private modalController: ModalController) {}

  public async present(component: ComponentRef, componentProps: ComponentProps) {
    const modal = await this.modalController.create({
      component,
      componentProps
    });
    return await modal.present();
  }
}
