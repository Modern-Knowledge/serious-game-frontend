import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "salutation"
})
export class SalutationPipe implements PipeTransform {
    public transform(value: any, args?: any): any {
        return value ? "Frau" : "Herr";
    }
}
