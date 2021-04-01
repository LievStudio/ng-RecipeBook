import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('form', {static: false}) form: NgForm;

  itemSubscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private listSvc: ShoppingListService) { }

  ngOnInit() {
    this.itemSubscription = this.listSvc.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index
      this.editedItem = this.listSvc.getIngredient(this.editedItemIndex);
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    });
  }

  onSubmit(form: NgForm): void {
   const newIngredient = new Ingredient(form.form.value.name, form.form.value.amount);
   if (this.editMode) {
     this.listSvc.updateIngredient(this.editedItemIndex, newIngredient);
   } else {
     this.listSvc.addIngredient(newIngredient);
   }
   this.editMode = false;
   this.form.reset();
  }

  onClear(): void {
    this.form.reset();
    this.editMode = false;
  }

  onDelete(): void {
    this.listSvc.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.itemSubscription.unsubscribe();
  }

}
