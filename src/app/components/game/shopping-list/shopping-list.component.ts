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
import { IonContent } from '@ionic/angular';

@Component({
    providers: [SharedModule],
    selector: "serious-game-shopping-list",
    styleUrls: ["./shopping-list.component.scss"],
    templateUrl: "./shopping-list.component.html"
})
export class ShoppingListComponent implements OnInit, IGameComponent {
    @Input() public game: Game;
    @Input() public data: Array<Recipe | Word>;
    @Input() public errorTexts: Errortext[];
    @Input() public mainGameSubject: Subject<any>;
    @Input() public scrollContainer: IonContent;
    @Output() public event: EventEmitter<any> = new EventEmitter();
    @Output() public errorEvent: EventEmitter<any> = new EventEmitter();
    public name = "shoppinglist";
    public ingredients: Ingredient[] = [];
    public shoppingListItems: Ingredient[];
    private subscription: Subscription = new Subscription();
    private fridgeItems: Ingredient[];
    private templateParser: TemplateParser = new TemplateParser();
    private maxItems: number = 5;

    constructor(
        private ingredientService: IngredientService,
        private shoppingListStore: ShoppingListStoreService,
        private dragulaService: DragulaService,
        private fridgeStore: FridgeStoreService,
        private recipeStore: RecipeStoreService
    ) {}

    public ngOnInit() {
        this.ingredients = [...this.recipeStore.currentRecipe.ingredients];
        this.maxItems += this.recipeStore.currentRecipe.ingredients.length;
        this.subscription.add(
            this.ingredientService.getAll().subscribe((ingredients) => {
                for (
                    let i = Math.floor(Math.random() * ingredients.length);
                    i < ingredients.length;
                    i++
                ) {
                    const index = Math.floor(
                        Math.random() * ingredients.length
                    );
                    if (
                        this.ingredients.findIndex(
                            (ingredient) =>
                                ingredient.id === ingredients[index].id
                        ) === -1
                    ) {
                        this.ingredients.push(ingredients[index]);
                    }
                }
                this.ingredients.splice(this.maxItems);
                this.shuffle(this.ingredients);
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
                if (this.compareShoppingListWithRecipe() === true) {
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
     * Adds item to shopping list
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
        } else {
            this.shoppingListStore.addItem(item);
            if (this.compareShoppingListWithRecipe()) {
                this.event.emit();
            }
        }
    }

    /**
     * Compares the ingredients defined in the recipe with the items
     * of the fridge + the items in the shopping list
     * @return whether the shopping list contains every needed item or not
     */
    public compareShoppingListWithRecipe(): boolean {
        let allItemsFound = true;
        let noDuplicateItems = true;
        this.recipeStore.currentRecipe.ingredients.forEach((ingredient) => {
            if(this.shoppingListItems.findIndex(item => item.id === ingredient.id) > -1 && this.fridgeItems.findIndex(item => item.id === ingredient.id) > -1){
                noDuplicateItems = false;
            }
            const valid = this.shoppingListItems
                    .concat(this.fridgeItems)
                    .findIndex(
                        (recipeIngredient) =>
                            recipeIngredient.id === ingredient.id
                    ) > -1;
            if(valid === false){
                allItemsFound = false;
            }
        });
        return allItemsFound && noDuplicateItems;
    }

    /**
     * Removes item from the shopping list
     * @param item Ingredient|Word
     */
    public removeItem(item) {
        this.shoppingListStore.removeItem(item);
        if (this.compareShoppingListWithRecipe()) {
            this.event.emit();
        }
    }

    /**
     * Checks if item added to the shopping list is valid
     * @param item Ingredient|Word
     */
    public validShoppingListItem(item: Ingredient | Word): boolean {
        return (
            this.fridgeItems.findIndex(
                (fridgeItem) => fridgeItem.id === item.id
            ) === -1
        );
    }

    /**
     * Shuffles ingredients.
     * Based on the modern Fisher-Yates-shuffle algorithm.
     * [https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm]
     * @param ingredients The ingredients to shuffle.
     */
    public shuffle(ingredients: Ingredient[]) {
        for (let i = ingredients.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ingredients[i], ingredients[j]] = [ingredients[j], ingredients[i]];
        }
        return ingredients;
    }

    /**
     * Clears the initialized storages and the current recipe.
     */
    public cleanupResources() {
        this.shoppingListStore.clearItems();
        this.fridgeStore.clearItems();
        this.recipeStore.currentRecipe = null;
        this.ingredients = [];
    }
}