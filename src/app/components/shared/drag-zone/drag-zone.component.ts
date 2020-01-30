import { Component, Input } from "@angular/core";
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
    selector: "serious-game-drag-zone",
    styleUrls: ["./drag-zone.component.scss"],
    templateUrl: "./drag-zone.component.html"
})
export class DragZoneComponent {
    @Input() public id: string;
    @Input() public name: string;
    @Input() public model: string;

    private subscription: Subscription = new Subscription();

    constructor(private dragulaService: DragulaService) {}

    public ngOnInit() {
        const options: AddEventListenerOptions = {
            passive: false
        }

        const listener = e => e.preventDefault();

        this.subscription.add(
            this.dragulaService.drag(this.name).subscribe((value) => {
                document.addEventListener("touchmove", listener, options);
            })
        );
        this.subscription.add(
            this.dragulaService.drop(this.name).subscribe((value) => {
                
                document.removeEventListener("touchmove",  listener, options);
            })
        );
    }
}
