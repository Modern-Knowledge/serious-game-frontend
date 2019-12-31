import { AlertController } from "@ionic/angular";

export class AlertWrapper {
    private _header: string;
    private _subHeader: string;
    private _message: string;
    private _buttons: string[];
    private _alertController: AlertController;
    constructor(
        message: string,
        header?: string,
        subHeader?: string,
        buttons?: string[]
    ) {
        this._header = header ? header : "Nachricht";
        this._subHeader = subHeader ? subHeader : "";
        this._message = message;
        this._buttons = buttons ? buttons : [AlertButton.OK];
        this._alertController = new AlertController();
    }

    public get header() {
        return this._header;
    }

    public set header(value) {
        this._header = value;
    }

    public get subHeader() {
        return this._subHeader;
    }

    public set subHeader(value) {
        this._subHeader = value;
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
        const alert = await this._alertController.create({
            buttons: this.buttons,
            header: this.header,
            message: this.message,
            subHeader: this.subHeader
        });
        await alert.present();
    }
}

export const enum AlertButton {
    OK = "OK",
    ABORT = "Abbrechen"
}
