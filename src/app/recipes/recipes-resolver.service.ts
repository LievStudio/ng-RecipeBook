import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})

export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataSvc: DataStorageService, private recipeSvc: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeSvc.getRecipes();
    if (recipes.length === 0) {
      return this.dataSvc.getRecipes();
    } else {
      return recipes;
    }
  }

}
