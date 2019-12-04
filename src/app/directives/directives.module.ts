import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ComponentIsDirective } from "./component-is.directive";

@NgModule({
  imports: [CommonModule],
  declarations: [ComponentIsDirective],
  exports: [ComponentIsDirective]
})
export class DirectivesModule {}
