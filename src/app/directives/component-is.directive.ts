import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[component-is]"
})
export class ComponentIsDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
