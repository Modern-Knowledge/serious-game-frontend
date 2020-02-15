import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
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
    @Input() public model: any[];
    @Input() public scrollElement: IonContent;
    @Output() public itemDropped: EventEmitter<any> = new EventEmitter<any>();
    public dragging: boolean = false;

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
                const that = this;
                this.dragging = true;
                document.addEventListener("touchmove", listener, options);
                if (this.scrollElement) {
                    Promise.resolve(this.scrollElement.getScrollElement()).then(
                        (element) => {
                            autoScroll([element], {
                                direction: "vertical",
                                margin: 50,
                                maxSpeed: 10,
                                autoScroll() {
                                    return that.dragging;
                                }
                            });
                        }
                    );
                }
            })
        );
        this.subscription.add(
            this.dragulaService.drop(this.name).subscribe((value) => {
                document.removeEventListener("touchmove", listener, options);
                this.dragging = false;
            })
        );
    }
}
