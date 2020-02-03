import { Component, Input, OnInit } from "@angular/core";
import { IonContent } from "@ionic/angular";
import autoScroll from "dom-autoscroller";
import { DragulaService } from "ng2-dragula";
import { Subscription } from "rxjs";

@Component({
    selector: "serious-game-drag-zone",
    styleUrls: ["./drag-zone.component.scss"],
    templateUrl: "./drag-zone.component.html"
})
export class DragZoneComponent implements OnInit {
    @Input() public id: string;
    @Input() public name: string;
    @Input() public model: string;
    @Input() public scrollElement: IonContent;

    private subscription: Subscription = new Subscription();

    constructor(private dragulaService: DragulaService) {}

    public ngOnInit() {
        const options: AddEventListenerOptions = {
            passive: false
        };
        const listener = (e) => {
            e.preventDefault();
        };
        this.subscription.add(
            this.dragulaService.drag(this.name).subscribe((value) => {
                document.addEventListener("touchmove", listener, options);
                Promise.resolve(this.scrollElement.getScrollElement()).then(
                    (element) => {
                        autoScroll([element], {
                            direction: "vertical",
                            margin: 50,
                            maxSpeed: 10,
                            autoScroll() {
                                return true;
                            }
                        });
                    }
                );
            })
        );
        this.subscription.add(
            this.dragulaService.drop(this.name).subscribe((value) => {
                document.removeEventListener("touchmove", listener, options);
            })
        );
    }
}
