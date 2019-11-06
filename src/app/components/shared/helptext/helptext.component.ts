import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Helptext } from 'src/lib/models/Helptext';

@Component({
  selector: 'serious-game-helptext',
  templateUrl: './helptext.component.html',
  styleUrls: ['./helptext.component.scss']
})
export class HelptextComponent implements OnInit {
  @Input() helptexts: Helptext[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }
}
