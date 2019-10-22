import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DragulaService } from "ng2-dragula";

@Component({
  selector: "serious-game-drop-zone",
  templateUrl: "./drop-zone.component.html",
  styleUrls: ["./drop-zone.component.scss"]
})
export class DropZoneComponent implements OnInit {
  @Input() name: string;
  @Input() model: any[];
  @Input() displayedItems: any[];
  @Output() itemDropped: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemDragged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private dragulaService: DragulaService) {}

  ngOnInit() {
    this.dragulaService.dropModel(this.name).subscribe(value => {
      const item = this.model.find(element => element.id === +value.el.id);
      this.itemDropped.emit(item);
    });
    this.dragulaService.drag(this.name).subscribe(value => {
      const item = this.model.find(element => element.id === +value.el.id);
      this.itemDragged.emit(item);
    });
  }
}
