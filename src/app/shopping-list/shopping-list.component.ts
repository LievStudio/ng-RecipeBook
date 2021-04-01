import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private ingredientsSubscription: Subscription;

  constructor(private listSvc: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.listSvc.getIngredients();
    this.ingredientsSubscription = this.listSvc.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  onEditItem(index: number) {
    this.listSvc.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
  }

}