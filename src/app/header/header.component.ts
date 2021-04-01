import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataSvc: DataStorageService) {}

  onSaveData(): void {
    this.dataSvc.storeRecipes();
  }

  onFetchData(): void {
    this.dataSvc.getRecipes().subscribe();
  }
}
