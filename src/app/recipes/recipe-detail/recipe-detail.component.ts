import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe: Recipe;
  id: number;

  constructor(private recipeSvc: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.selectedRecipe = this.recipeSvc.getRecipe(this.id)
    })
  }

  onAddToShoppingList() {
    this.recipeSvc.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(): void {
    this.recipeSvc.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
