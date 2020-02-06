import { Component, Inject, Input, OnInit } from "@angular/core";

@Component({
    selector: "serious-game-image",
    styleUrls: ["./image.component.scss"],
    templateUrl: "./image.component.html"
})
export class ImageComponent implements OnInit {
    public source: string;
    @Input() public imageId: string;
    @Input() public width: number;
    @Input() public height: number;
    @Input() public title: string;

    constructor(@Inject("BACKEND_URL") private baseUrl: string) {}

    public ngOnInit() {
        this.source = `${this.baseUrl}/images/${this.imageId}`;
    }
}
