import { Component, Input } from "@angular/core";

@Component({
    selector: "serious-game-drag-zone",
    styleUrls: ["./drag-zone.component.scss"],
    templateUrl: "./drag-zone.component.html"
})
export class DragZoneComponent {
    @Input() public id: string;
    @Input() public name: string;
    @Input() public model: string;
}
