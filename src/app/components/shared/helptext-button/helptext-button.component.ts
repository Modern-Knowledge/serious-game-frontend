import { Component, Input, OnInit } from '@angular/core';
import { ModalWrapper } from 'src/app/util/ModalWrapper';
import { Helptext } from 'src/lib/models/Helptext';

import { HelptextComponent } from '../helptext/helptext.component';

@Component({
  selector: 'serious-game-helptext-button',
  templateUrl: './helptext-button.component.html',
  styleUrls: ['./helptext-button.component.scss'],
  providers: [ModalWrapper]
})
export class HelptextButtonComponent implements OnInit {
  @Input() helptexts: Helptext[];
  constructor(private modalWrapper: ModalWrapper) {}

  ngOnInit() {}

  showHelpText() {
    this.modalWrapper.present(HelptextComponent, { helptexts: this.helptexts });
  }
}
