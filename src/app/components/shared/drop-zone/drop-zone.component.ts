import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DragulaService, DrakeFactory } from "ng2-dragula";
import { Subscription } from "rxjs";

@Component({
  selector: "serious-game-drop-zone",
  templateUrl: "./drop-zone.component.html",
  styleUrls: ["./drop-zone.component.scss"]
})
export class DropZoneComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() model: any[];
  @Input() displayedItems: any[];
  @Input() accepts: any;
  @Output() itemDropped: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemDragged: EventEmitter<any> = new EventEmitter<any>();

  private subscription: Subscription = new Subscription();

  constructor(private dragulaService: DragulaService) {}

  ngOnInit() {
    this.subscription.add(
      this.dragulaService.dropModel(this.name).subscribe(value => {
        if (value.target.id === this.id) {
          const item = this.model.find(element => element.id === +value.el.id);
          this.itemDropped.emit(item);
        }
      })
    );
    this.subscription.add(
      this.dragulaService.drag(this.name).subscribe(value => {
        const item = this.model.find(element => element.id === +value.el.id);
        this.itemDragged.emit(item);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
