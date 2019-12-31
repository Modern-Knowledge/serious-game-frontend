import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: "[seriousGameComponentIs]"
})
export class ComponentIsDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
