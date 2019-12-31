import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Subscription } from "rxjs";

@Component({
    selector: "serious-game-drop-zone",
    styleUrls: ["./drop-zone.component.scss"],
    templateUrl: "./drop-zone.component.html"
})
export class DropZoneComponent implements OnInit, OnDestroy {
    @Input() public id: string;
    @Input() public name: string;
    @Input() public model: any[];
    @Input() public displayedItems: any[];
    @Input() public accepts: any;
    @Output() public itemDropped: EventEmitter<any> = new EventEmitter<any>();
    @Output() public itemDragged: EventEmitter<any> = new EventEmitter<any>();

    private subscription: Subscription = new Subscription();

    constructor(private dragulaService: DragulaService) {}

    public ngOnInit() {
        this.subscription.add(
            this.dragulaService.dropModel(this.name).subscribe((value) => {
                if (value.target.id === this.id) {
                    const item = this.model.find(
                        (element) => element.id === +value.el.id
                    );
                    this.itemDropped.emit(item);
                }
            })
        );
        this.subscription.add(
            this.dragulaService.drag(this.name).subscribe((value) => {
                const item = this.model.find(
                    (element) => element.id === +value.el.id
                );
                this.itemDragged.emit(item);
            })
        );
    }

    public ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
