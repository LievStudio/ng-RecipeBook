import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeSvc: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipeSvc.getRecipes();
    this.http.put(
      'https://ng-recipe-book-f2212-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe((res) => console.log(res));
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://ng-recipe-book-f2212-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })
      }),
      tap(recipes => {
        console.log(recipes)
        this.recipeSvc.setRecipes(recipes);
      }))
  }
}
