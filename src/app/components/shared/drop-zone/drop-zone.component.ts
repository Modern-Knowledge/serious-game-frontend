import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Subscription } from "rxjs";

@Component({
  selector: "serious-game-drop-zone",
  templateUrl: "./drop-zone.component.html",
  styleUrls: ["./drop-zone.component.scss"]
})
export class DropZoneComponent implements OnInit {
  @Input() name: string;
  @Input() model: any[];
  @Input() displayedItems: any[];
  @Input() accepts: any;
  @Output() itemDropped: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemDragged: EventEmitter<any> = new EventEmitter<any>();

  subscriptions = new Subscription();

  constructor(private dragulaService: DragulaService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.dragulaService.dropModel(this.name).subscribe(value => {
        const item = this.model.find(element => element.id === +value.el.id);
        this.itemDropped.emit(item);
      })
    );
    this.subscriptions.add(
      this.dragulaService.drag(this.name).subscribe(value => {
        const item = this.model.find(element => element.id === +value.el.id);
        this.itemDragged.emit(item);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
