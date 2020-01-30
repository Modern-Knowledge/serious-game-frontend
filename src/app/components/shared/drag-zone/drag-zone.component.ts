import { Component, Input } from "@angular/core";
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import autoScroll from "dom-autoscroller"
import { IonContent } from '@ionic/angular';

@Component({
    selector: "serious-game-drag-zone",
    styleUrls: ["./drag-zone.component.scss"],
    templateUrl: "./drag-zone.component.html"
})
export class DragZoneComponent {
    @Input() public id: string;
    @Input() public name: string;
    @Input() public model: string;
    @Input() public scrollElement: IonContent;

    private subscription: Subscription = new Subscription();

    constructor(private dragulaService: DragulaService) {}

    getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            _x += el.offsetLeft - el.scrollLeft;
            _y += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }

    public ngOnInit() {
        const options: AddEventListenerOptions = {
            passive: false
        }
        let offset = 0;
        const listener = e => {
            e.preventDefault();
            const y = this.getOffset(e.srcElement).top;
            
            Promise.resolve(this.scrollElement.getScrollElement()).then(element => {
                if(y >= element.clientHeight-100){
                    this.scrollElement.scrollToBottom()
                    offset = y;
                }
                else if(y+offset <= element.clientHeight+100){
                    this.scrollElement.scrollToTop();
                }
            })
        };
        this.subscription.add(
            this.dragulaService.drag(this.name).subscribe((value) => {
                document.addEventListener("touchmove", listener, options);
            })
        );
        this.subscription.add(
            this.dragulaService.drop(this.name).subscribe((value) => {
                
                document.removeEventListener("touchmove",  listener, options);
            })
        );
    }
}
