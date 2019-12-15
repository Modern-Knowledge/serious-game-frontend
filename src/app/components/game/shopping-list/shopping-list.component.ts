import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DragulaService } from "ng2-dragula";
import { Subject, Subscription } from "rxjs";
import { IngredientService } from "src/app/providers/ingredient.service";
import { FridgeStoreService } from "src/app/providers/store/fridge-store.service";
import { RecipeStoreService } from "src/app/providers/store/recipe-store.service";
import { ShoppingListStoreService } from "src/app/providers/store/shopping-list-store.service";
import { Errortext } from "src/lib/models/Errortext";
import { Game } from "src/lib/models/Game";
import { Ingredient } from "src/lib/models/Ingredient";
import { Recipe } from "src/lib/models/Recipe";
import { Word } from "src/lib/models/Word";
import { TemplateParser } from "src/lib/utils/TemplateParser";

import { SharedModule } from "../../shared/shared.module";
import { IGameComponent } from "../game.component";

@Component({
    selector: "serious-game-shopping-list",
    templateUrl: "./shopping-list.component.html",
    providers: [SharedModule],
    styleUrls: ["./shopping-list.component.scss"]
})
export class ShoppingListComponent implements OnInit, IGameComponent {
    @Input() public game: Game;
    @Input() public data: Array<Recipe | Word>;
    @Input() public errorTexts: Errortext[];
    @Input() public mainGameSubject: Subject<any>;
    @Output() public event: EventEmitter<any> = new EventEmitter();
    @Output() public errorEvent: EventEmitter<any> = new EventEmitter();
    public name = "shoppinglist";
    public ingredients: Ingredient[];
    public shoppingListItems: Ingredient[];
    private subscription: Subscription = new Subscription();
    private fridgeItems: Ingredient[];
    private itemsValid = false;
    private templateParser: TemplateParser = new TemplateParser();

    constructor(
        private ingredientService: IngredientService,
        private shoppingListStore: ShoppingListStoreService,
        private dragulaService: DragulaService,
        private fridgeStore: FridgeStoreService,
        private recipeStore: RecipeStoreService
    ) {}

    public ngOnInit() {
        this.subscription.add(
            this.ingredientService.getAll().subscribe((ingredient) => {
                this.ingredients = ingredient;
            })
        );
        this.subscription.add(
            this.dragulaService.dropModel(this.name).subscribe((value) => {
                const item = this.data.find(
                    (element) => element.id === +value.el.id
                );
                if (value.target.id === "drag") {
                    this.removeItem(item);
                } else {
                    this.addItem(item);
                    this.dragulaService.find(this.name).drake.cancel(true);
                }
            })
        );
        this.subscription.add(
            this.shoppingListStore.items$.subscribe((items) => {
                this.shoppingListItems = items;
            })
        );
        this.subscription.add(
            this.fridgeStore.items$.subscribe((items) => {
                this.fridgeItems = items;
            })
        );
        this.subscription.add(
            this.mainGameSubject.subscribe(() => {
                if (this.compareShoppingListWithRecipe()) {
                    this.event.emit();
                } else {
                    this.errorEvent.emit(
                        this.errorTexts.find(
                            (errorText) => errorText.name === "shopping-list"
                        )
                    );
                }
            })
        );
    }
    /**
     * adds item to shopping list
     * @param item Ingredient|Word
     */
    public addItem(item) {
        const shoppingListErrorText: Errortext = new Errortext();
        if (!this.fridgeStore.alreadyRandomized) {
            shoppingListErrorText.deserialize(
                this.errorTexts.find(
                    (errorText) => errorText.name === "fridge-not-checked"
                )
            );
            this.errorEvent.emit(shoppingListErrorText);
        } else if (!this.validShoppingListItem(item)) {
            shoppingListErrorText.deserialize(
                this.errorTexts.find(
                    (errorText) => errorText.name === "item-already-in-fridge"
                )
            );
            shoppingListErrorText.text = this.templateParser.parse(
                shoppingListErrorText.text,
                [item.name]
            );
            this.errorEvent.emit(shoppingListErrorText);
        } else {
            this.shoppingListStore.addItem(item);
            if (this.compareShoppingListWithRecipe()) {
                this.event.emit();
            }
        }
    }

    /**
     * compares the ingredients defined in the recipe with the items
     * of the fridge + the items in the shopping list
     * @return whether the shopping list contains every needed item or not
     */
    public compareShoppingListWithRecipe(): boolean {
        this.recipeStore.currentRecipe.ingredients.forEach((ingredient) => {
            this.itemsValid =
                this.shoppingListItems
                    .concat(this.fridgeItems)
                    .findIndex(
                        (recipeIngredient) =>
                            recipeIngredient.id === ingredient.id
                    ) > -1;
        });
        return this.itemsValid;
    }

    /**
     * removes item from the shopping list
     * @param item Ingredient|Word
     */
    public removeItem(item) {
        this.shoppingListStore.removeItem(item);
        if (this.compareShoppingListWithRecipe()) {
            this.event.emit();
        }
    }

    /**
     * checks if item added to the shopping list is valid
     * @param item Ingredient|Word
     */
    public validShoppingListItem(item: Ingredient | Word): boolean {
        return (
            this.fridgeItems.findIndex(
                (fridgeItem) => fridgeItem.id === item.id
            ) === -1
        );
    }

    public cleanupResources() {
        this.shoppingListStore.clearItems();
        this.fridgeStore.clearItems();
        this.recipeStore.currentRecipe = null;
    }
}
