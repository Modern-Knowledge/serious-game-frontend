import { ToastController } from "@ionic/angular";
import { HttpResponseMessageSeverity } from "src/lib/utils/http/HttpResponse";

export class ToastWrapper {
  private _header: string;
  private _position: ToastPosition;
  private _message: string;
  private _buttons: ToastButton[];
  private _severity: HttpResponseMessageSeverity;
  private _toastController: ToastController;
  constructor(
    message: string,
    position?: ToastPosition,
    severity?: HttpResponseMessageSeverity,
    header?: string,
    buttons?: ToastButton[]
  ) {
    this._header = header ? header : "Nachricht";
    this._position = position ? position : ToastPosition.TOP;
    this._message = message;
    this._buttons = buttons ? buttons : [new ToastButton(ToastButtonLabel.OK)];
    this._severity = severity ? severity : HttpResponseMessageSeverity.SUCCESS;
    this._toastController = new ToastController();
  }

  public get header() {
    return this._header;
  }

  public set header(value) {
    this._header = value;
  }

  public get position() {
    return this._position;
  }

  public set position(value) {
    this._position = value;
  }

  public get severity() {
    return this._severity;
  }

  public set severity(value) {
    this._severity = value;
  }

  public get message() {
    return this._message;
  }

  public set message(value) {
    this._message = value;
  }

  public get buttons() {
    return this._buttons;
  }

  public set buttons(value) {
    this._buttons = value;
  }

  public async alert() {
    const alert = await this._toastController.create({
      header: this.header,
      position: this.position,
      message: this.message,
      color: this.severity.toString(),
      animated: true,
      duration: 2000
    });
    await alert.present();
  }
}

class ToastButton {
  private _side: string;
  private _icon: string;
  private _text: string;

  constructor(text: string, icon?: string, side?: string) {
    this._side = side ? side : "start";
    this._icon = icon ? icon : "star";
    this._text = text;
  }
}

export const enum ToastPosition {
  TOP = "top",
  MIDDLE = "middle",
  BOTTOM = "bottom"
}

export const enum ToastButtonLabel {
  OK = "OK",
  ABORT = "Abbrechen"
}
