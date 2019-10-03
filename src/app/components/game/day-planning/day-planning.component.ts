import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { Recipe } from 'src/lib/models/Recipe';

@Component({
  selector: 'serious-game-day-planning',
  templateUrl: './day-planning.component.html',
  styleUrls: ['./day-planning.component.scss'],
})
export class DayPlanningComponent implements OnInit {

  constructor(private dragulaService: DragulaService){}

  @Input() words: String[];
  @Output() recipeAdded: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  ngOnInit(){
    this.dragulaService.dropModel("recipes")
      .subscribe(value => {
        this.recipeAdded.emit(value.item);
      })
  }

  doReorder(event: any) {
    event.detail.complete();
  }

}
