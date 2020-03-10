import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { AlertController } from "@ionic/angular";

export interface IComponentCanDeactivate {
    canDeactivate: () => boolean;
}
@Injectable({
    providedIn: "root"
})
export class LeaveGuard implements CanDeactivate<IComponentCanDeactivate> {
    constructor(private alertController: AlertController) {}

    /**
     * Warns the user before leaving by showing a modal to confirm the process.
     */
    public async canDeactivate(
        component: IComponentCanDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Promise<boolean> {
        let leave = false;
        if (nextState.root.queryParams.mayLeave) {
            return true;
        }
        const alert = await this.alertController.create({
            buttons: [
                {
                    handler: () => {
                        leave = true;
                    },
                    text: "Spiel verlassen"
                },
                {
                    handler: () => {
                        leave = false;
                    },
                    text: "Im Spiel bleiben"
                }
            ],
            header: "Warnung",
            message:
                "Wollen Sie das aktuelle Spiel wirklich verlassen? Der Fortschritt geht verloren.",
            subHeader: "Verlassen des Spiels"
        });

        await alert.present();
        await alert.onDidDismiss();
        return leave;
    }
}
